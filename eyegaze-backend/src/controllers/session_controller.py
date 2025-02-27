from fastapi import APIRouter, HTTPException
from ..services.firebase_service import create_session
from ..scripts.generate_heatmap import generate_heatmap

router = APIRouter()

@router.post("/save-participant-data")
async def save_participant_data(data: dict):
    required_fields = [
        "website_id", "name", "feedback", 
        "session_start_time", "session_end_time", "gaze_points"
    ]
    
    try:
        # Validate required fields
        if not all(data.get(field) for field in required_fields):
            raise HTTPException(status_code=400, detail="Missing required fields")
        
        # Validate feedback range
        if not isinstance(data["feedback"], int) or not 1 <= data["feedback"] <= 5:
            raise HTTPException(status_code=400, detail="Feedback must be an integer between 1 and 5")
        
        # Save participant data
        participant_id = create_session(data["website_id"], data)
        
        # Generate individual heatmap
        generate_heatmap(data["website_id"], participant_id)
        
        return {
            "message": "Session data uploaded successfully",
            "participant_id": participant_id
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))