from pydantic import BaseModel


class ImageAnalysisResponse(BaseModel):
    toxicity: int
    offense: bool
    comment: str