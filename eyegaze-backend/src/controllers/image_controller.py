import os
import uuid
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import Response, StreamingResponse
import io
from typing import Optional
from ..services.aws_service import upload_to_s3, download_from_s3
from ..services.firebase_service import db

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
        
@router.get("/get-heatmap/{website_id}/{session_id}")
async def get_session_heatmap(website_id: str, session_id: str):
    """
    Get the heatmap image for a specific session.
    """
    try:
        print(f"Fetching session document for ID: {session_id}")
        # Get session document
        session_doc = db.collection('sessions').document(session_id).get()
        
        print(f"Session exists: {session_doc.exists}")
        if not session_doc.exists:
            raise HTTPException(status_code=404, detail="Session not found")
            
        session_data = session_doc.to_dict()
        print(f"Session data: {session_data}")
        
        # Construct the heatmap URL based on the known pattern
        heatmap_url = f"heatmaps/{website_id}/session_{session_id}_heatmap.jpg"
        print(f"Constructed heatmap URL: {heatmap_url}")
        
        print(f"Attempting to download from S3: {heatmap_url}")
        image_data = download_from_s3(heatmap_url)
        
        if not image_data:
            # If heatmap not found, try to get the original image
            website_doc = db.collection('websites').document(website_id).get()
            if website_doc.exists:
                website_data = website_doc.to_dict()
                original_image = website_data.get("s3FileKey")
                if original_image:
                    image_data = download_from_s3(original_image)
                    if image_data:
                        return StreamingResponse(io.BytesIO(image_data), media_type="image/jpeg")
            
            raise HTTPException(status_code=404, detail="Heatmap image not found in storage")
            
        return StreamingResponse(io.BytesIO(image_data), media_type="image/jpeg", 
                               headers={"Access-Control-Allow-Origin": "*"})
        
    except Exception as e:
        print(f"Error in get_session_heatmap: {str(e)}")
        print(f"Full error details: {type(e).__name__}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
@router.get("/get-heatmap/{website_id}")
async def get_website_heatmap(website_id: str):
    """
    Get the combined heatmap image for a website (all sessions).
    """
    try:
        website_doc = db.collection('websites').document(website_id).get()
        if not website_doc.exists:
            raise HTTPException(status_code=404, detail="Website not found")
            
        website_data = website_doc.to_dict()
        heatmap_url = website_data.get("heatmapUrl")
        
        if not heatmap_url:
            # If no heatmap exists, return the original website image
            s3_file_key = website_data.get("s3FileKey")
            if not s3_file_key:
                raise HTTPException(status_code=404, detail="No image found")
            image_data = download_from_s3(s3_file_key)
        else:
            image_data = download_from_s3(heatmap_url)
            
        if not image_data:
            raise HTTPException(status_code=404, detail="Image not found in storage")
            
        return StreamingResponse(io.BytesIO(image_data), media_type="image/jpeg")
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))