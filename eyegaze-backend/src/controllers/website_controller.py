# src/controllers/website_controller.py
from fastapi import APIRouter, HTTPException
from ..services.firebase_service import save_website_data

router = APIRouter()

@router.post("/save-website")
async def save_website(data: dict):
    try:
        # Extract required fields from request data
        owner_id = data.get("owner_id")
        owner_name = data.get("owner_name")
        title = data.get("title")
        guideline = data.get("guideline")
        s3_file_key = data.get("s3_file_key")
        participant_link = data.get("participant_link")
        
        # Validate required fields
        if not all([owner_id, owner_name, title, guideline, s3_file_key, participant_link]):
            raise HTTPException(status_code=400, detail="Missing required fields")
        
        # Save website data to Firebase
        website_id = save_website_data(
            owner_id=owner_id,
            owner_name=owner_name,
            title=title,
            guideline=guideline,
            s3_file_key=s3_file_key,
            participant_link=participant_link
        )
        
        return {
            "message": "Website data saved successfully",
            "website_id": website_id
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
