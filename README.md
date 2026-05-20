<div align="center">

# ☣️ Multimodal Comment Toxicity Analysis System

### AI-powered multimodal toxicity detection for text, images, and social media discussions

Built with **FastAPI, PyTorch, Transformers, EasyOCR, Next.js, and TypeScript**

<p align="center">

<img src="https://img.shields.io/badge/Python-3.12-blue?style=for-the-badge&logo=python" />
<img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi" />
<img src="https://img.shields.io/badge/PyTorch-Deep_Learning-EE4C2C?style=for-the-badge&logo=pytorch" />
<img src="https://img.shields.io/badge/HuggingFace-Transformers-yellow?style=for-the-badge" />
<img src="https://img.shields.io/badge/OCR-EasyOCR-green?style=for-the-badge" />
<img src="https://img.shields.io/badge/Next.js-Frontend-black?style=for-the-badge&logo=nextdotjs" />
<img src="https://img.shields.io/badge/TypeScript-Frontend-3178C6?style=for-the-badge&logo=typescript" />
<img src="https://img.shields.io/badge/TailwindCSS-UI-38B2AC?style=for-the-badge&logo=tailwindcss" />

</p>

</div>



## 📌 Overview

**Multimodal Comment Toxicity Analysis System** is a coursework project focused on toxicity detection in internet content using artificial intelligence and multimodal analysis.

The system combines **natural language processing**, **computer vision**, **OCR**, and **social media parsing** to detect toxic or offensive content in:

- text comments;
- images and memes;
- VK posts and discussions;
- YouTube comments.

The project was developed using a **client-server architecture** with a layered backend design.



## ✨ Features

### 📝 Text Analysis

Analyze manually entered text and detect:

- toxicity percentage;
- offensive language;
- overall toxicity level;
- toxic / safe classification.



### 🖼️ Image Analysis

The system supports image toxicity detection using a **multimodal pipeline**:

1. OCR text extraction from image;
2. Toxicity analysis of extracted text;
3. Visual content analysis;
4. Result aggregation.

Supported formats:

```text
PNG / JPG / JPEG
```


### 💬 Social Media Post Analysis

Analyze comments from:

- VK posts;
- YouTube videos.

The system automatically:

- loads comments;
- analyzes toxicity;
- detects offensive language;
- calculates toxicity statistics.

Returned statistics:

- total comments;
- toxic comments count;
- offensive comments count;
- toxicity percentage.



## 🏗️ Architecture

### System Architecture

```text
User
  ↓
Frontend (Next.js)
  ↓
REST API
  ↓
Backend (FastAPI)
  ↓
OCR + ML Models + Social Media Parsers
  ↓
Analysis Result
```

### Backend Architecture

The backend follows a layered architecture pattern:

```text
Controller → Service → Repository → Model
```



## 🧰 Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| Next.js | frontend framework |
| React | UI |
| TypeScript | type safety |
| Tailwind CSS | styling |

### Backend

| Technology | Purpose |
|------------|---------|
| FastAPI | REST API |
| PyTorch | neural networks |
| Transformers | NLP models |
| EasyOCR | OCR extraction |
| Pydantic | schema validation |

### APIs

| API | Purpose |
|-----|---------|
| VK API | VK comments |
| YouTube Data API | YouTube comments |



## 📂 Project Structure

```text
toxicity-detector/
│
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── models/
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
│
├── test/
│
└── README.md
```



## 🚀 Installation

### 1. Clone repository

```bash
git clone https://github.com/little3snake/toxicity-detector.git
cd toxicity-detector
```



### 2. Setup backend

```bash
cd backend

python -m venv .venv

.venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend will run on:

```text
http://localhost:8000
```



### 3. Setup frontend

Open a new terminal:

```bash
cd frontend

npm install

npm run dev
```

Frontend will run on:

```text
http://localhost:3000
```



## 🤖 Models

Model files are **not stored in GitHub** because of their large size.

Place model folders manually:

```text
backend/app/models/toxicity/
backend/app/models/image_toxicity/
```

Expected structure:

```text
backend/app/models/
│
├── toxicity/
│   ├── config.json
│   ├── model.safetensors
│   ├── tokenizer.json
│   └── tokenizer_config.json
│
└── image_toxicity/
    ├── classifier.pth
    ├── config.json
    ├── model.safetensors
    ├── processor_config.json
    ├── tokenizer.json
    └── tokenizer_config.json
```



## 🔌 API Endpoints

### Analyze text

```http
POST /analyze/text
```



### Analyze image

```http
POST /analyze/image
```



### Analyze post

```http
POST /analyze/post
```



## 🧪 Testing

The project includes testing for:

- text toxicity analysis;
- OCR text extraction;
- image toxicity analysis;
- safe / toxic memes;
- invalid links;
- unavailable posts;
- deleted posts;
- unavailable comments.

Run tests:

```bash
python test/run_text_tests.py
python test/run_image_tests.py
python test/run_post_tests.py
```



## ⚠️ Current Limitations

- OCR quality depends on image resolution and contrast;
- image toxicity detection may produce false positives;
- English toxicity analysis requires additional training;
- private or deleted posts cannot be analyzed.



## 🔮 Future Improvements

- improve English toxicity support;
- expand image toxicity dataset;
- improve OCR preprocessing;
- add Docker support;
- add Swagger/OpenAPI documentation;
- improve automated testing;
- add export of analysis results.



## 👨‍💻 Authors

**Coursework Project**

Developed by **little3snake** 


