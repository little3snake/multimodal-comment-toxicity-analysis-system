from fastapi import APIRouter

from app.schemas.post_schema import PostAnalysisRequest, PostAnalysisResponse
from app.services.post_service import analyze_post

router = APIRouter(prefix="/analyze", tags=["Post analysis"])


@router.post("/post", response_model=PostAnalysisResponse)
def analyze_post_endpoint(request: PostAnalysisRequest):
    return analyze_post(request.url)