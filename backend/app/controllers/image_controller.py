from fastapi import APIRouter, UploadFile, File

from app.schemas.image_schema import ImageAnalysisResponse
from app.services.image_service import analyze_image

router = APIRouter(prefix="/analyze", tags=["Image analysis"])


@router.post("/image", response_model=ImageAnalysisResponse)
async def analyze_image_endpoint(file: UploadFile = File(...)):
    return await analyze_image(file)