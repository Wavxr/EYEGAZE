import os
import uuid
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import Response
from typing import Optional
from ..services.aws_service import upload_to_s3, download_from_s3

router = APIRouter()

@router.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...),
    title: str = Form(...),
    guideline: str = Form(...),
    owner_id: Optional[str] = Form(None),
    owner_name: Optional[str] = Form(None)
):
    """
    Upload an image file to S3 storage.
    
    Args:
        file: Image file to upload
        title: Website title
        guideline: Website testing guidelines
        owner_id: Optional owner identifier
        owner_name: Optional owner name
    
    Returns:
        dict: Upload details including file key and session ID
    """
    try:
        file_extension = os.path.splitext(file.filename)[1].lower()
        if file_extension not in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
            raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image file.")

        file_content = await file.read()
        file_key = f"images/{str(uuid.uuid4())}{file_extension}"
        
        content_type = file.content_type or "image/jpeg"
        s3_url = upload_to_s3(file_content, file_key, content_type)
        
        session_id = str(uuid.uuid4())
        
        return {
            "message": "Image uploaded successfully",
            "file_key": file_key,
            "session_id": session_id,
            "url": s3_url
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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