import tempfile
from pathlib import Path

import easyocr
from fastapi import UploadFile, HTTPException

from app.repositories.model_repository import toxicity_model_repository
from app.schemas.image_schema import ImageAnalysisResponse


reader = easyocr.Reader(["ru", "en"], gpu=False)


async def analyze_image(file: UploadFile) -> ImageAnalysisResponse:
    if not file.content_type or file.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(
            status_code=400,
            detail="Поддерживаются только PNG и JPG изображения.",
        )

    suffix = Path(file.filename or "").suffix or ".png"

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
        temp_file.write(await file.read())
        temp_file_path = temp_file.name

    try:
        ocr_result = reader.readtext(temp_file_path, detail=0)
        extracted_text = " ".join(ocr_result).strip()

        # for debug
        print(f"Распознанный текст: {repr(extracted_text)}")

        if not extracted_text:
            raise HTTPException(
                status_code=422,
                detail="Не удалось распознать текст на изображении.",
            )

        result = toxicity_model_repository.analyze(extracted_text)

        toxicity = result["toxicity_percent"]
        offense = result["has_insult"]
        comment = result["comment"]

        return ImageAnalysisResponse(
            toxicity=toxicity,
            offense=offense,
            comment=comment,
        )

    finally:
        Path(temp_file_path).unlink(missing_ok=True)