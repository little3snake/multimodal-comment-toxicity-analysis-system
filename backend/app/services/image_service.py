import tempfile
from pathlib import Path

import easyocr
from fastapi import UploadFile, HTTPException

from app.repositories.image_model_repository import (image_model_repository,)
from app.repositories.model_repository import (toxicity_model_repository,)
from app.schemas.image_schema import ImageAnalysisResponse


reader = easyocr.Reader(["ru", "en"], gpu=False)


async def analyze_image(file: UploadFile) -> ImageAnalysisResponse:
    if not file.content_type or file.content_type not in ["image/png","image/jpeg",]:
        raise HTTPException(
            status_code=400,
            detail="Поддерживаются только PNG и JPG изображения.",
        )

    suffix = Path(file.filename or "").suffix or ".png"

    with tempfile.NamedTemporaryFile(delete=False,suffix=suffix,) as temp_file:
        temp_file.write(await file.read())
        temp_file_path = temp_file.name

    try:
        ocr_result = reader.readtext(temp_file_path,detail=0,)
        extracted_text = " ".join(ocr_result).strip()
        print(f"OCR text: {repr(extracted_text)}")

        if extracted_text:
            text_result = (toxicity_model_repository.analyze(extracted_text))
            ocr_toxicity = text_result["toxicity_percent"]
            ocr_offense = text_result["has_insult"]
        else:
            ocr_toxicity = 0
            ocr_offense = False


        image_result = (image_model_repository.predict_image(temp_file_path))
        image_toxicity = image_result["image_toxicity"]
        image_offense = image_result["image_offense"]

        final_toxicity = max(ocr_toxicity,image_toxicity,)
        final_offense = (ocr_offense or image_offense or final_toxicity > 75)

        if final_offense: comment = ("Обнаружен потенциально токсичный контент.")
        else: comment = ("Токсичный контент не обнаружен.")

        # debug
        print(
            f"OCR toxicity: "
            f"{ocr_toxicity}"
        )

        print(
            f"Image toxicity: "
            f"{image_toxicity}"
        )

        print(
            f"Final toxicity: "
            f"{final_toxicity}"
        )

        return ImageAnalysisResponse(
            toxicity=final_toxicity,
            offense=final_offense,
            comment=comment,
        )

    finally:
        Path(
            temp_file_path
        ).unlink(
            missing_ok=True
        )