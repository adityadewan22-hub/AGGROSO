# app/config.py
import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    APP_NAME = "CSV Insights Dashboard"
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")
    GEMINI_KEY = os.getenv("GEMINI_KEY")


settings = Settings()
