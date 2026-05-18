from app.repositories.model_repository import toxicity_model_repository
from app.schemas.text_schema import TextAnalysisResponse


def analyze_text(text: str) -> TextAnalysisResponse:
    toxicity = toxicity_model_repository.predict_toxicity(text)

    offense = toxicity > 75

    if toxicity > 50:
        comment = "Текст имеет признаки токсичности."
    else:
        comment = "Явная токсичность не обнаружена."

    return TextAnalysisResponse(
        toxicity=toxicity,
        offense=offense,
        comment=comment,
    )