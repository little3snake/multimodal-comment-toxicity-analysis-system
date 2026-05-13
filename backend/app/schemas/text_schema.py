from pydantic import BaseModel, Field


class TextAnalysisRequest(BaseModel):
    text: str = Field(..., min_length=1)


class TextAnalysisResponse(BaseModel):
    toxicity: int
    offense: bool
    comment: str