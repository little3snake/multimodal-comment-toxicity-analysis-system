from fastapi import APIRouter

from app.schemas.text_schema import TextAnalysisRequest, TextAnalysisResponse
from app.services.text_service import analyze_text

router = APIRouter(prefix="/analyze", tags=["Text analysis"])


@router.post("/text", response_model=TextAnalysisResponse)
def analyze_text_endpoint(payload: TextAnalysisRequest):
    return analyze_text(payload.text)