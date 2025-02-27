from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from ..services.aws_service import download_from_s3

router = APIRouter()

@router.get("/get-image/{file_key:path}")
async def get_image(file_key: str):
    """
    Retrieve and serve an image file from S3 storage.
    
    Args:
        file_key (str): The S3 key for the image file
    
    Returns:
        Response: Image file with appropriate content type
    """
    try:
        image_data = download_from_s3(file_key)
        
        # Determine content type based on file extension
        content_type = "image/jpeg"  # Default content type
        if file_key.endswith((".png", ".gif", ".webp")):
            ext = file_key.split(".")[-1].lower()
            content_type = f"image/{ext}"
        
        return Response(
            content=image_data, 
            media_type=content_type, 
            headers={"Access-Control-Allow-Origin": "*"}
        )
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
