from app.llm.generation import call_gemini
import json


def build_prompt(dataset_summary: dict) -> str:
    return f"""
You are a data analyst.

Based on the dataset summary below, generate:

1. Key trends or patterns
2. Possible outliers or anomalies
3. Data quality issues
4. Business questions to investigate next

Keep the report concise and practical.

Dataset summary:
{json.dumps(dataset_summary, indent=2)}
"""


def generate_insights(dataset_summary: dict) -> str:
    prompt = build_prompt(dataset_summary)
    result = call_gemini(prompt)
    return str(result)
