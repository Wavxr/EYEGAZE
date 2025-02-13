from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from services.aws_service import download_from_s3

router = APIRouter()

@router.get("/get-html-raw/{file_key:path}")
async def get_html_raw(file_key: str):
    """
    Returns the HTML file as text/html directly.
    This way, an <iframe> can render it properly.
    """
    try:
        html_content = download_from_s3(file_key)
        if not html_content:
            raise HTTPException(status_code=404, detail="HTML file not found")
        return Response(content=html_content, media_type="text/html")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
