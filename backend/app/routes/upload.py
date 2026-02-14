from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import io
import numpy as np
from fastapi.encoders import jsonable_encoder
from app.services.summary import generate_dataset_summary

router = APIRouter(prefix="/api", tags=["CSV"])


@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):

    # Basic file validation
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed.")

    try:
        contents = await file.read()

        # Prevent very large uploads (basic safety)
        if len(contents) > 5 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="File too large. Max 5MB.")

        df = pd.read_csv(io.BytesIO(contents))

        dataset_summary = generate_dataset_summary(df)

        # Replace problematic values
        df = df.replace([np.inf, -np.inf], np.nan)
        df = df.astype(object)
        df = df.where(pd.notnull(df), None)

        # Build preview
        preview = jsonable_encoder(df.head(20).to_dict(orient="records"))

        # Detect column types
        column_info = []
        for col in df.columns:
            dtype = str(df[col].dtype)

            if "int" in dtype or "float" in dtype:
                col_type = "numeric"
            elif "datetime" in dtype:
                col_type = "datetime"
            else:
                col_type = "categorical"

            column_info.append({"name": col, "type": col_type})

        return {
            "filename": file.filename,
            "row_count": int(len(df)),
            "column_count": int(len(df.columns)),
            "columns": column_info,
            "preview": preview,
            "dataset_summary": dataset_summary,
        }

    except Exception:
        raise HTTPException(status_code=400, detail="Invalid or corrupted CSV file.")
