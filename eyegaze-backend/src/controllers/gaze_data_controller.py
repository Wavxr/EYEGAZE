# src/controllers/gaze_data_controller.py
from fastapi import APIRouter, HTTPException
from ..services.firebase_service import save_session_participant

router = APIRouter()

@router.post("/upload-session-data")
async def upload_session_data(data: dict):
    try:
        # Extract required fields from request data
        session_id = data.get("session_id")
        participant_name = data.get("name")
        feedback = data.get("feedback")
        session_start_time = data.get("session_start_time")
        session_end_time = data.get("session_end_time")
        gaze_points = data.get("gaze_points")
        
        # Validate required fields
        if not all([session_id, participant_name, feedback, session_start_time, session_end_time, gaze_points]):
            raise HTTPException(status_code=400, detail="Missing required fields")
        
        # Prepare participant data for Firebase
        participant_data = {
            "name": participant_name,
            "feedback": feedback,
            "session_start_time": session_start_time,
            "session_end_time": session_end_time,
            "gaze_points": gaze_points
        }
        
        # Save participant data to Firebase
        participant_id = save_session_participant(session_id, participant_data)
        
        return {
            "message": "Session data uploaded successfully",
            "participant_id": participant_id
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))