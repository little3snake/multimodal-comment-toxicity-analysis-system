from app.repositories.model_repository import toxicity_model_repository
from app.schemas.text_schema import TextAnalysisResponse

def analyze_text(text: str) -> TextAnalysisResponse:
    result = toxicity_model_repository.analyze(text)

    return TextAnalysisResponse(
        toxicity=result["toxicity_percent"],
        offense=result["has_insult"],
        comment=result["comment"],
    )