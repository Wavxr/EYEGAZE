# src/controllers/gaze_data_controller.py
from fastapi import APIRouter, HTTPException
from ..services.firebase_service import save_session_participant

router = APIRouter()

@router.post("/save-participant-data")
async def save_participant_data(data: dict):
    try:
        # Extract required fields from request data
        website_id = data.get("session_id")  # session_id is actually website_id
        participant_name = data.get("name")
        feedback = data.get("feedback")
        session_start_time = data.get("session_start_time")
        session_end_time = data.get("session_end_time")
        gaze_points = data.get("gaze_points")
        
        # Validate required fields
        if not all([website_id, participant_name, feedback, session_start_time, session_end_time, gaze_points]):
            raise HTTPException(status_code=400, detail="Missing required fields")
        
        # Validate feedback range
        if not isinstance(feedback, int) or feedback < 1 or feedback > 5:
            raise HTTPException(status_code=400, detail="Feedback must be an integer between 1 and 5")
        
        # Prepare participant data for Firebase
        participant_data = {
            "name": participant_name,
            "feedback": feedback,
            "session_start_time": session_start_time,
            "session_end_time": session_end_time,
            "gaze_points": gaze_points
        }
        
        # Save participant data to Firebase
        participant_id = save_session_participant(website_id, participant_data)
        
        return {
            "message": "Session data uploaded successfully",
            "participant_id": participant_id
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))