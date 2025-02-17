# eyegaze-backend/src/controllers/image_upload_controller.py
import os
import uuid
from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional
from ..services.aws_service import upload_to_s3

router = APIRouter()

@router.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...),
    title: str = Form(...),
    guideline: str = Form(...),
    owner_id: Optional[str] = Form(None),
    owner_name: Optional[str] = Form(None)
):
    try:
        # Generate a unique file key
        file_extension = os.path.splitext(file.filename)[1].lower()
        if file_extension not in ['.jpg', '.jpeg', '.png', '.gif', '.webp']:
            return {"error": "Invalid file type. Please upload an image file."}

        # Read the file content
        file_content = await file.read()
        
        # Generate a unique file key
        file_key = f"images/{str(uuid.uuid4())}{file_extension}"
        
        # Upload to S3
        content_type = file.content_type or "image/jpeg"
        s3_url = upload_to_s3(file_content, file_key, content_type)
        
        # Generate a unique session ID
        session_id = str(uuid.uuid4())
        
        return {
            "message": "Image uploaded successfully",
            "file_key": file_key,
            "session_id": session_id,
            "url": s3_url
        }
    except Exception as e:
        return {"error": str(e)}
