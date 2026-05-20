from pathlib import Path

import requests
import torch
import torch.nn as nn
from PIL import Image
from transformers import CLIPModel, CLIPProcessor


class ImageToxicityClassifier(nn.Module):
    def __init__(self, clip_model: CLIPModel):
        super().__init__()

        self.clip = clip_model

        for param in self.clip.parameters():
            param.requires_grad = False

        proj_dim = clip_model.config.projection_dim

        self.classifier = nn.Sequential(
            nn.Linear(proj_dim, 256),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(256, 1),
        )

    def forward(self, pixel_values):
        outputs = self.clip.vision_model(pixel_values=pixel_values)
        pooled_output = outputs.pooler_output
        image_features = self.clip.visual_projection(pooled_output)
        return self.classifier(image_features)


class ImageModelRepository:
    def __init__(self) -> None:
        self.device = "cuda" if torch.cuda.is_available() else "cpu"

        self.model_path = (
            Path(__file__).resolve().parents[1]
            / "models"
            / "image_toxicity"
        )

        self.clip_model = CLIPModel.from_pretrained(
            str(self.model_path),
            local_files_only=True,
        ).to(self.device)

        self.processor = CLIPProcessor.from_pretrained(
            str(self.model_path),
            local_files_only=True,
        )

        self.model = ImageToxicityClassifier(self.clip_model).to(self.device)

        classifier_path = self.model_path / "classifier.pth"
        self.model.classifier.load_state_dict(
            torch.load(
                classifier_path,
                map_location=self.device,
            )
        )

        self.model.eval()

    def predict_image(self, image_path: str, threshold: float = 0.7) -> dict:
        image = Image.open(image_path).convert("RGB")

        inputs = self.processor(
            images=image,
            return_tensors="pt",
        )

        with torch.no_grad():
            pixel_values = inputs["pixel_values"].to(self.device)
            logits = self.model(pixel_values)
            probability = torch.sigmoid(logits).item()

        return {
            "image_toxicity": round(probability * 100),
            "image_offense": probability > threshold,
        }


image_model_repository = ImageModelRepository()