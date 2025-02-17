from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from ..services.aws_service import download_from_s3

router = APIRouter()

@router.get("/get-image/{file_key:path}")
async def get_image(file_key: str):
    """
    Retrieve and serve an image file from S3.
    """
    try:
        # Download the image from S3
        image_data = download_from_s3(file_key)
        
        content_type = "image/jpeg" 
        if file_key.endswith(".png"):
            content_type = "image/png"
        elif file_key.endswith(".gif"):
            content_type = "image/gif"
        elif file_key.endswith(".webp"):
            content_type = "image/webp"
        
        return Response(content=image_data, media_type=content_type)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
