from pathlib import Path

import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer


class ToxicityModelRepository:
    def __init__(self) -> None:
        self.model_path = Path(__file__).resolve().parents[1] / "models" / "toxicity"

        self.tokenizer = AutoTokenizer.from_pretrained(
            str(self.model_path),
            local_files_only=True,
        )

        self.model = AutoModelForSequenceClassification.from_pretrained(
            str(self.model_path),
            local_files_only=True,
        )

        self.model.eval()

    def predict_toxicity(self, text: str) -> int:
        inputs = self.tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            padding=True,
            max_length=512,
        )

        with torch.no_grad():
            outputs = self.model(**inputs)
            probabilities = torch.softmax(outputs.logits, dim=1)[0]

        toxic_probability = float(probabilities[1])
        toxicity = round(toxic_probability * 100)

        return toxicity


toxicity_model_repository = ToxicityModelRepository()