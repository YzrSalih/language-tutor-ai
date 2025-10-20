from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

# OpenAI 1.x client
from openai import OpenAI

load_dotenv()

app = FastAPI(title="Language Tutor AI", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AI provider configuration (prefer Gemini if GOOGLE_API_KEY is set)
AI_PROVIDER = None
GENAI = None
OPENAI_CLIENT: Optional[OpenAI] = None
GENAI_MODEL_NAME: Optional[str] = None

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if GOOGLE_API_KEY:
    try:
        import google.generativeai as genai  # type: ignore
        genai.configure(api_key=GOOGLE_API_KEY)
        GENAI = genai
        GENAI_MODEL_NAME = "gemini-pro"
        try:
            models = list(genai.list_models())
            usable = []
            for m in models:
                try:
                    # Bazı sürümlerde alan adı farklı olabilir, güvenli erişim
                    methods = set(getattr(m, "supported_generation_methods", []) or [])
                except Exception:
                    methods = set()
                if "generateContent" in methods or "generate_content" in methods:
                    # m.name tipik olarak "models/<model-name>"
                    name = (getattr(m, "name", "") or "").split("/")[-1]
                    if name:
                        usable.append(name)
            # Tercih sırası
            candidates = [
                "gemini-pro",
                "gemini-1.0-pro",
                "gemini-1.0-pro-latest",
                "gemini-1.5-pro",
                "gemini-1.5-pro-latest",
                "gemini-1.5-flash",
                "gemini-1.5-flash-latest",
            ]
            for c in candidates:
                if c in usable:
                    GENAI_MODEL_NAME = c
                    break
        except Exception:
            pass
        AI_PROVIDER = "gemini" if GENAI_MODEL_NAME else None
    except Exception:
        AI_PROVIDER = None

if not AI_PROVIDER and OPENAI_API_KEY:
    try:
        OPENAI_CLIENT = OpenAI(api_key=OPENAI_API_KEY)
        AI_PROVIDER = "openai"
    except Exception:
        AI_PROVIDER = None

# Pydantic models
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    language: str
    difficulty_level: str

class ChatResponse(BaseModel):
    message: str
    correction: Optional[str] = None
    explanation: Optional[str] = None

class LessonRequest(BaseModel):
    language: str
    topic: str
    difficulty_level: str

class LessonResponse(BaseModel):
    title: str
    content: str
    vocabulary: List[dict]
    exercises: List[dict]

@app.get("/")
async def root():
    return {"message": "Language Tutor AI Backend"}

@app.post("/chat", response_model=ChatResponse)
async def chat_with_tutor(request: ChatRequest):
    if not AI_PROVIDER:
        raise HTTPException(status_code=500, detail="No AI provider configured. Set GOOGLE_API_KEY or OPENAI_API_KEY")

    try:
        # Create system prompt based on language and difficulty
        system_prompt = f"""
        Sen bir {request.language} dil öğretmenisin. Öğrencinin seviyesi: {request.difficulty_level}.
        
        Görevlerin:
        1. Öğrencinin sorularını yanıtla
        2. Dilbilgisi hatalarını düzelt
        3. Daha iyi ifadeler öner
        4. Kelime dağarcığını geliştirmesine yardım et
        5. Samimi ve teşvik edici ol
        
        Her yanıtında:
        - Ana mesajı ver
        - Varsa düzeltmeleri belirt
        - Açıklama yap
        """

        if AI_PROVIDER == "gemini" and GENAI is not None:
            if not GENAI_MODEL_NAME:
                raise HTTPException(status_code=500, detail="No Gemini model available for this API key")
            dialog_lines = [f"{m.role.upper()}: {m.content}" for m in request.messages]
            prompt = "\n".join([
                "SYSTEM INSTRUCTION:",
                system_prompt.strip(),
                "",
                "DIALOG:",
                *dialog_lines
            ])
            model_name = GENAI_MODEL_NAME
            try:
                model = GENAI.GenerativeModel(model_name)
                result = model.generate_content(prompt)
            except Exception:
                model_name = "gemini-pro"
                model = GENAI.GenerativeModel(model_name)
                result = model.generate_content(prompt)
            ai_response = getattr(result, "text", "") or ""
        else:
            if not OPENAI_CLIENT:
                raise HTTPException(status_code=500, detail="OpenAI client not initialized")
            messages = [{"role": "system", "content": system_prompt}]
            messages.extend([{"role": msg.role, "content": msg.content} for msg in request.messages])
            response = OPENAI_CLIENT.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=500,
                temperature=0.7,
            )
            ai_response = response.choices[0].message.content or ""
        
        return ChatResponse(
            message=ai_response,
            correction=None,
            explanation=None,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-lesson", response_model=LessonResponse)
async def generate_lesson(request: LessonRequest):
    try:
        prompt = f"""
        {request.language} dilinde "{request.topic}" konusunda {request.difficulty_level} seviyesinde bir ders oluştur.
        
        Ders şunları içermeli:
        1. Başlık
        2. Açıklayıcı içerik
        3. Önemli kelimeler ve anlamları
        4. Alıştırmalar
        
        JSON formatında yanıt ver.
        """
        
        if AI_PROVIDER == "gemini" and GENAI is not None:
            if not GENAI_MODEL_NAME:
                raise HTTPException(status_code=500, detail="No Gemini model available for this API key")
            try:
                model = GENAI.GenerativeModel(GENAI_MODEL_NAME)
                _ = model.generate_content(prompt)
            except Exception:
                model = GENAI.GenerativeModel("gemini-pro")
                _ = model.generate_content(prompt)
        elif AI_PROVIDER == "openai" and OPENAI_CLIENT is not None:
            _ = OPENAI_CLIENT.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=1000,
                temperature=0.7,
            )
        
        return LessonResponse(
            title=f"{request.topic} - {request.difficulty_level}",
            content="Ders içeriği burada olacak...",
            vocabulary=[{"word": "örnek", "meaning": "example"}],
            exercises=[{"question": "Örnek soru?", "answer": "Örnek yanıt"}],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/languages")
async def get_supported_languages():
    return {
        "languages": [
            {"code": "en", "name": "English"},
            {"code": "es", "name": "Spanish"},
            {"code": "fr", "name": "French"},
            {"code": "de", "name": "German"},
            {"code": "it", "name": "Italian"},
            {"code": "pt", "name": "Portuguese"},
            {"code": "ru", "name": "Russian"},
            {"code": "ja", "name": "Japanese"},
            {"code": "ko", "name": "Korean"},
            {"code": "zh", "name": "Chinese"},
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
