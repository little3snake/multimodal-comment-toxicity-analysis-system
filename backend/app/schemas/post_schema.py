from pydantic import BaseModel


class PostAnalysisRequest(BaseModel):
    url: str


class ParsedComment(BaseModel):
    comment_id: int | str
    author_id: int | str
    date: str
    text: str
    image_urls: list[str]
    is_reply: bool
    reply_to_comment: int | str | None
    toxicity: int
    offense: bool


class PostAnalysisResponse(BaseModel):
    source: str
    post_url: str
    total_comments: int
    toxic_comments: int
    comments: list[ParsedComment]