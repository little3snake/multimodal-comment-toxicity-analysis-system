from fastapi import HTTPException

from app.services.vk_parser_service import analyze_vk_post
from app.services.youtube_parser_service import analyze_youtube_video


def analyze_post(url: str):
    if "vk.com/wall" in url:
        return analyze_vk_post(url)

    if "youtube.com/watch" in url or "youtu.be/" in url or "youtube.com/shorts" in url:
        return analyze_youtube_video(url)

    raise HTTPException(
        status_code=400,
        detail="Поддерживаются только ссылки VK и YouTube.",
    )