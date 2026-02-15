# app/main.py
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()
from app.routes import health
from app.config import settings
from app.routes import upload
from app.routes import insights
from app.db import engine, Base
from app.routes import reports
from app.routes import status
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://aggroso-alpha.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(upload.router)
app.include_router(insights.router)
print("REPORTS MODULE:", reports)
print("HAS ROUTER:", hasattr(reports, "router"))
app.include_router(reports.router)
app.include_router(status.router)

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {
        "message": "Welcome to CSV Insights Dashboard",
        "next_step": "Upload a CSV to begin analysis.",
    }
