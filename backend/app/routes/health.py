# app/routes/health.py
from fastapi import APIRouter
from sqlalchemy import text
from app.db import engine
from app.config import settings

router = APIRouter()


@router.get("/health")
def health_check():
    status = {"api": "ok", "database": "unknown", "llm": "unknown"}

    # DB check
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        status["database"] = "ok"
    except:
        status["database"] = "error"

    # LLM check (basic)
    if settings.GEMINI_KEY:
        status["llm"] = "configured"
    else:
        status["llm"] = "not_configured"

    return status
