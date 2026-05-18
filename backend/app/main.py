from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.controllers.text_controller import router as text_router
from app.controllers.image_controller import router as image_router
from app.controllers.post_controller import router as post_router

app = FastAPI(title="Toxicity Detector API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(text_router)
app.include_router(image_router)
app.include_router(post_router)



@app.get("/")
def root():
    return {"status": "ok"}