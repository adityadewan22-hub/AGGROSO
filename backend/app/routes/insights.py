from fastapi import APIRouter, HTTPException
from app.llm.insights import generate_insights
from app.db import SessionLocal
from app.models.report import Report

router = APIRouter(prefix="/api", tags=["Insights"])


@router.post("/generate-insights")
def generate(payload: dict):
    db = SessionLocal()

    try:
        summary = payload.get("dataset_summary")
        filename = payload.get("filename", "unknown.csv")

        insights = generate_insights(summary)

        new_report = Report(filename=filename, summary=insights)

        db.add(new_report)
        db.commit()
        db.refresh(new_report)

        return {"report_id": new_report.id, "insights": insights}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        db.close()
