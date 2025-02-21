# src/controllers/gaze_data_controller.py
from fastapi import APIRouter, HTTPException
from ..services.firebase_service import (
    save_session_participant, 
    get_website_gaze_data,
    get_all_websites
)
from ..scripts.generate_heatmap import generate_heatmap
from ..services.firebase_service import db

# Initialize router first
router = APIRouter()

@router.post("/generate-heatmap/{website_id}")
async def generate_heatmap_endpoint(website_id: str, session_id: str = None):
    try:
        success = generate_heatmap(website_id, session_id)
        if success:
            return {"message": "Heatmap generated successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to generate heatmap")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/website-gaze-data/{website_id}")
async def get_website_gaze_data_endpoint(website_id: str):
    try:
        website_doc = db.collection('websites').document(website_id).get()
        if not website_doc.exists:
            raise HTTPException(status_code=404, detail="Website not found")
            
        website_data = website_doc.to_dict()
        
        # Get all sessions for this website
        sessions = db.collection('sessions')\
            .where('websiteId', '==', website_id)\
            .stream()
            
        participants = []
        for session in sessions:
            session_data = session.to_dict()
            participants.append({
                "name": session_data.get("name"),
                "feedback": session_data.get("feedback")
            })
            
        return {
            "websiteTitle": website_data.get("title"),
            "heatmapUrl": website_data.get("heatmapUrl"),
            "participants": participants
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        gaze_data = get_website_gaze_data(website_id)
        if not gaze_data:
            raise HTTPException(status_code=404, detail="Website data not found")
        return gaze_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/websites")
async def get_websites():
    try:
        websites = get_all_websites()
        return websites
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/save-participant-data")
async def save_participant_data(data: dict):
    try:
        # Extract required fields from request data
        website_id = data.get("website_id")  # Changed from session_id
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
        
        # Save participant session data to Firebase
        participant_id = save_session_participant(website_id, participant_data)
        
        # Generate new heatmap
        generate_heatmap(website_id, participant_id)
        
        return {
            "message": "Session data uploaded successfully",
            "participant_id": participant_id
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
