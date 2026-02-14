import pandas as pd
import numpy as np


def generate_dataset_summary(df: pd.DataFrame):
    summary = {
        "rows": int(len(df)),
        "columns": int(len(df.columns)),
        "numeric_columns": [],
        "categorical_columns": [],
        "missing_summary": [],
    }

    # Missing values per column
    for col in df.columns:
        missing_pct = round(df[col].isnull().mean() * 100, 2)

        summary["missing_summary"].append(
            {"column": col, "missing_percent": missing_pct}
        )

    # Detect numeric columns
    numeric_cols = df.select_dtypes(include=["int64", "float64"]).columns
    categorical_cols = df.select_dtypes(include=["object", "bool"]).columns

    # Numeric stats
    for col in numeric_cols:
        col_data = df[col].dropna()

        if len(col_data) == 0:
            continue

        summary["numeric_columns"].append(
            {
                "column": col,
                "mean": float(col_data.mean()),
                "min": float(col_data.min()),
                "max": float(col_data.max()),
                "std": float(col_data.std()),
            }
        )

    # Categorical stats
    for col in categorical_cols:
        top_values = df[col].value_counts().head(3).to_dict()

        summary["categorical_columns"].append({"column": col, "top_values": top_values})

    return summary
