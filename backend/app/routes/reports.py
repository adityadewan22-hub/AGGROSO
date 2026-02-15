from app.db import SessionLocal
from app.models.report import Report
from fastapi import APIRouter, HTTPException
from fastapi.responses import Response


router = APIRouter(prefix="/api", tags=["Report"])

# gives 5 newest reports


@router.get("/reports")
def get_last_reports():
    db = SessionLocal()

    try:
        reports = db.query(Report).order_by(Report.created_at.desc()).limit(5).all()

        return [
            {
                "id": r.id,
                "filename": r.filename,
                "created_at": r.created_at,
            }
            for r in reports
        ]

    finally:
        db.close()


# to get a single report by its ID


@router.get("/reports/{report_id}")
def get_report(report_id: int):
    db = SessionLocal()
    try:
        report = db.query(Report).filter(Report.id == report_id).first()

        if not report:
            raise HTTPException(status_code=404, detail="Report not found")

        return {
            "id": report.id,
            "filename": report.filename,
            "summary": report.summary,
            "created_at": report.created_at,
        }
    finally:
        db.close()


# to get a markdown file of your insights


@router.get("/reports/{report_id}/export")
def export_report(report_id: int):
    db = SessionLocal()

    try:
        report = db.query(Report).filter(Report.id == report_id).first()

        if not report:
            raise HTTPException(status_code=404, detail="Report not found")

        markdown_content = f"""# CSV Insights Report

**Filename:** {report.filename}  
**Generated At:** {report.created_at}

---

{report.summary}
"""

        return Response(
            content=markdown_content,
            media_type="text/markdown",
            headers={
                "Content-Disposition": f"attachment; filename=report_{report.id}.md"
            },
        )

    finally:
        db.close()
