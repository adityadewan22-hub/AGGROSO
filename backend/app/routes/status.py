from fastapi import APIRouter
from sqlalchemy import text
from datetime import datetime, timezone
from app.db import engine
from app.llm.generation import call_gemini
import os

router = APIRouter(prefix="/api", tags=["Status"])


@router.get("/status")
def get_status():
    status = {
        "api": "ok",
        "database": "unknown",
        "llm": "unknown",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }

    # Database check
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        status["database"] = "ok"
    except Exception:
        status["database"] = "error"

    # LLM check
    try:
        api_key = os.getenv("GEMINI_KEY")
        if not api_key:
            status["llm"] = "not_configured"
        else:
            # lightweight test prompt
            test_response = call_gemini("Reply with: OK")
            if "OK" in test_response:
                status["llm"] = "ok"
            else:
                status["llm"] = "unexpected_response"
    except Exception:
        status["llm"] = "error"

    return status
