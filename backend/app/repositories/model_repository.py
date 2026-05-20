from pathlib import Path
import re

import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer


class ToxicityModelRepository:
    def __init__(self) -> None:
        self.model_path = (
            Path(__file__).resolve().parents[1]
            / "models"
            / "toxicity"
        )

        self.tokenizer = AutoTokenizer.from_pretrained(
            str(self.model_path),
            local_files_only=True,
        )

        self.model = AutoModelForSequenceClassification.from_pretrained(
            str(self.model_path),
            local_files_only=True,
        )

        self.model.eval()

        self.insult_words = [
            # RU
            "идиот", "дурак", "дебил", "кретин",
            "тупой", "глупый", "тупица",
            "лох", "мудак", "козел",
            "сволочь", "тварь", "ублюдок",
            "урод", "олух", "недоумок",
            "чмо", "мразь", "падла",
            "гнида", "придурок",
            "даун", "шизик", "псих",
            "ненормальный", "отморозок",
            "крыса", "шакал",
            "быдло",

            # EN insults
            "idiot", "moron", "stupid",
            "dumb", "imbecile",
            "loser", "jerk", "fool",
            "bastard", "scumbag",
            "retard", "psycho",
            "freak", "weirdo",
            "clown", "rat",

            # EN profanity / toxic language
            "fuck", "fucking",
            "shit", "bullshit",
            "bitch", "asshole",
            "motherfucker",
            "dickhead", "dumbass",
        ]

        self.hard_profanity_patterns = [
            r"\bебу\b",
            r"\bебать\b",
            r"\bебан\w*\b",
            r"\bёбан\w*\b",
            r"\bблять\b",
            r"\bблядь\b",
            r"\bхуй\w*\b",
            r"\bпизд\w*\b",
            r"\bпидор\w*\b",
            r"\bсука\b",
            r"\bтвою\s+маму\b",
            r"\bтвою\s+мать\b",
        ]

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
        return round(toxic_probability * 100)

    def analyze(self, text: str) -> dict:
        toxicity = self.predict_toxicity(text)

        found_insults = self._find_insults(text)
        has_insult = len(found_insults) > 0

        is_toxic = toxicity >= 50 or has_insult

        comment = self._generate_comment(
            toxicity,
            has_insult,
            found_insults,
        )

        return {
            "toxicity_percent": toxicity,
            "is_toxic": is_toxic,
            "has_insult": has_insult,
            "found_insults": found_insults,
            "comment": comment,
        }

    def _find_insults(self, text: str) -> list[str]:
        text_lower = text.lower()

        found_insults = []

        for word in self.insult_words:
            pattern = rf"(?<!\w){re.escape(word)}(?!\w)"

            if re.search(pattern, text_lower):
                found_insults.append(word)

        for pattern in self.hard_profanity_patterns:
            if re.search(pattern, text_lower):
                found_insults.append("грубая ненормативная лексика")
                break

        return found_insults

    def _generate_comment(
        self,
        toxicity: int,
        has_insult: bool,
        found_insults: list[str],
    ) -> str:
        if toxicity < 30 and not has_insult:
            return "Комментарий безопасный, токсичность не обнаружена."

        if toxicity < 30 and has_insult:
            return (
                "Комментарий содержит оскорбления: "
                f"{', '.join(found_insults)}."
            )

        if toxicity < 70:
            if has_insult:
                return (
                    "Комментарий токсичен. Обнаружены оскорбления: "
                    f"{', '.join(found_insults)}."
                )

            return "Комментарий имеет средний уровень токсичности."

        if has_insult:
            return (
                "Комментарий очень токсичен! Оскорбления: "
                f"{', '.join(found_insults)}."
            )

        return "Комментарий очень токсичен!"


toxicity_model_repository = ToxicityModelRepository()