import os
import re
from datetime import datetime

import requests
from dotenv import load_dotenv
from fastapi import HTTPException

from app.repositories.model_repository import toxicity_model_repository
from app.schemas.post_schema import PostAnalysisResponse, ParsedComment

load_dotenv()

VK_ACCESS_TOKEN = os.getenv("VK_ACCESS_TOKEN")
VK_API_VERSION = os.getenv("VK_API_VERSION", "5.199")


def parse_vk_post_url(url: str) -> tuple[int, int]:
    match = re.search(r"wall(-?\d+)_(\d+)", url)

    if not match:
        raise HTTPException(
            status_code=400,
            detail="Некорректная ссылка VK. Пример: https://vk.com/wall-94672807_6269268",
        )

    owner_id = int(match.group(1))
    post_id = int(match.group(2))

    return owner_id, post_id


def get_photo_urls(comment: dict) -> list[str]:
    urls = []

    for attachment in comment.get("attachments", []):
        if attachment.get("type") != "photo":
            continue

        photo = attachment.get("photo", {})
        sizes = photo.get("sizes", [])

        if not sizes:
            continue

        largest = max(
            sizes,
            key=lambda size: size.get("width", 0) * size.get("height", 0),
        )

        if largest.get("url"):
            urls.append(largest["url"])

    return urls


def analyze_comment(
    comment: dict,
    is_reply: bool,
    reply_to_comment: int | None = None,
) -> ParsedComment:
    text = comment.get("text", "")
    image_urls = get_photo_urls(comment)

    # Пока анализируем только текст.
    # Позже сюда добавим анализ изображения:
    # image_toxicity = analyze_image_url(image_url)
    toxicity = toxicity_model_repository.predict_toxicity(text) if text else 0
    offense = toxicity > 75

    return ParsedComment(
        comment_id=comment["id"],
        author_id=comment["from_id"],
        date=str(datetime.fromtimestamp(comment["date"])),
        text=text,
        image_urls=image_urls,
        is_reply=is_reply,
        reply_to_comment=reply_to_comment,
        toxicity=toxicity,
        offense=offense,
    )


def analyze_vk_post(url: str) -> PostAnalysisResponse:
    if not VK_ACCESS_TOKEN:
        raise HTTPException(
            status_code=500,
            detail="VK_ACCESS_TOKEN не найден в .env",
        )

    owner_id, post_id = parse_vk_post_url(url)

    response = requests.get(
        "https://api.vk.com/method/wall.getComments",
        params={
            "owner_id": owner_id,
            "post_id": post_id,
            "count": 100,
            "sort": "asc",
            "thread_items_count": 10,
            "access_token": VK_ACCESS_TOKEN,
            "v": VK_API_VERSION,
        },
        timeout=20,
    )

    data = response.json()

    if "error" in data:
        raise HTTPException(
            status_code=400,
            detail=data["error"].get("error_msg", "Ошибка VK API"),
        )

    comments: list[ParsedComment] = []

    for item in data["response"]["items"]:
        comments.append(
            analyze_comment(
                comment=item,
                is_reply=False,
                reply_to_comment=None,
            )
        )

        thread = item.get("thread", {})
        for reply in thread.get("items", []):
            comments.append(
                analyze_comment(
                    comment=reply,
                    is_reply=True,
                    reply_to_comment=reply.get("reply_to_comment"),
                )
            )

    toxic_comments = sum(1 for comment in comments if comment.offense)

    return PostAnalysisResponse(
        source="vk",
        post_url=url,
        total_comments=len(comments),
        toxic_comments=toxic_comments,
        comments=comments,
    )


def analyze_post(url: str) -> PostAnalysisResponse:
    if "vk.com/wall" in url:
        return analyze_vk_post(url)

    raise HTTPException(
        status_code=400,
        detail="Пока поддерживаются только ссылки VK wall.",
    )