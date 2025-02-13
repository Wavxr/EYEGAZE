# src/controllers/html_serve_controller.py
from fastapi import APIRouter, HTTPException
from services.aws_service import download_from_s3

router = APIRouter()

@router.get("/get-html/{file_key}")
async def get_html(file_key: str):
    try:
        # Download the HTML file from S3
        html_content = download_from_s3(file_key)
        
        if not html_content:
            raise HTTPException(status_code=404, detail="HTML file not found")
        
        return {"html": html_content.decode("utf-8")}
    except Exception as e:
        print(f"Error fetching HTML file: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))