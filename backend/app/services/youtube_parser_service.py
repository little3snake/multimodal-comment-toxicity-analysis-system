import os
import re
import time
import requests

from fastapi import HTTPException
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from app.repositories.model_repository import toxicity_model_repository
from app.schemas.post_schema import PostAnalysisResponse, ParsedComment


YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/commentThreads"
PAGE_DELAY_SECONDS = 0.4


def create_youtube_session() -> requests.Session:
    session = requests.Session()
    session.trust_env = False

    retries = Retry(
        total=5,
        connect=5,
        read=5,
        backoff_factor=1,
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET"],
    )

    adapter = HTTPAdapter(max_retries=retries)

    session.mount("https://", adapter)
    session.mount("http://", adapter)

    session.headers.update(
        {
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json",
        }
    )

    return session


def extract_youtube_video_id(url: str) -> str:
    patterns = [
        r"v=([a-zA-Z0-9_-]{11})",
        r"youtu\.be/([a-zA-Z0-9_-]{11})",
        r"youtube\.com/shorts/([a-zA-Z0-9_-]{11})",
    ]

    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)

    raise HTTPException(
        status_code=400,
        detail="Некорректная ссылка YouTube.",
    )


def build_comment(
    comment_id: str,
    author_id: str,
    date: str,
    text: str,
    is_reply: bool,
    reply_to_comment: str | None,
) -> ParsedComment:
    toxicity = toxicity_model_repository.predict_toxicity(text)

    return ParsedComment(
        comment_id=comment_id,
        author_id=author_id,
        date=date,
        text=text,
        image_urls=[],
        is_reply=is_reply,
        reply_to_comment=reply_to_comment,
        toxicity=toxicity,
        offense=toxicity > 75,
    )


def analyze_youtube_video(url: str) -> PostAnalysisResponse:
    api_key = os.getenv("YOUTUBE_API_KEY")

    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="YOUTUBE_API_KEY не задан в .env",
        )

    video_id = extract_youtube_video_id(url)
    session = create_youtube_session()

    comments: list[ParsedComment] = []
    next_page_token = None

    while True:
        params = {
            "part": "snippet,replies",
            "videoId": video_id,
            "maxResults": 100,
            "textFormat": "plainText",
            "key": api_key,
        }

        if next_page_token:
            params["pageToken"] = next_page_token

        try:
            response = session.get(
                YOUTUBE_API_URL,
                params=params,
                timeout=30,
            )
        except requests.RequestException as error:
            raise HTTPException(
                status_code=502,
                detail=f"Не удалось подключиться к YouTube API: {error}",
            )

        if response.status_code != 200:
            raise HTTPException(
                status_code=400,
                detail=f"YouTube API error: {response.status_code}. {response.text}",
            )

        data = response.json()

        for item in data.get("items", []):
            top_comment = item["snippet"]["topLevelComment"]
            top_snippet = top_comment["snippet"]
            top_text = top_snippet.get("textDisplay", "")

            if top_text:
                comments.append(
                    build_comment(
                        comment_id=top_comment["id"],
                        author_id=top_snippet.get("authorDisplayName", ""),
                        date=top_snippet.get("publishedAt", ""),
                        text=top_text,
                        is_reply=False,
                        reply_to_comment=None,
                    )
                )

            for reply in item.get("replies", {}).get("comments", []):
                reply_snippet = reply["snippet"]
                reply_text = reply_snippet.get("textDisplay", "")

                if not reply_text:
                    continue

                comments.append(
                    build_comment(
                        comment_id=reply["id"],
                        author_id=reply_snippet.get("authorDisplayName", ""),
                        date=reply_snippet.get("publishedAt", ""),
                        text=reply_text,
                        is_reply=True,
                        reply_to_comment=top_comment["id"],
                    )
                )

        next_page_token = data.get("nextPageToken")

        if not next_page_token:
            break

        time.sleep(PAGE_DELAY_SECONDS)

    toxic_comments = sum(1 for comment in comments if comment.offense)

    return PostAnalysisResponse(
        source="youtube",
        post_url=url,
        total_comments=len(comments),
        toxic_comments=toxic_comments,
        comments=comments,
    )