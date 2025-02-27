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
    """
    Generate a heatmap for a specific website or session.
    
    Args:
        website_id (str): The ID of the website
        session_id (str, optional): Specific session ID for individual heatmap
    
    Returns:
        dict: Success message or error details
    """
    try:
        success = generate_heatmap(website_id, session_id)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to generate heatmap")
        return {"message": "Heatmap generated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/website-gaze-data/{website_id}")
async def get_website_gaze_data_endpoint(website_id: str):
    """
    Retrieve gaze data and participant information for a website.
    
    Args:
        website_id (str): The ID of the website
    
    Returns:
        dict: Website data including title, heatmap URL, and participants
    """
    try:
        website_doc = db.collection('websites').document(website_id).get()
        if not website_doc.exists:
            raise HTTPException(status_code=404, detail="Website not found")
            
        website_data = website_doc.to_dict()
        sessions = db.collection('sessions').where('websiteId', '==', website_id).stream()
            
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
            "participants": participants,
            "participantLink": website_data.get("participantLink")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/save-participant-data")
async def save_participant_data(data: dict):
    """
    Save participant session data and generate their heatmap.
    
    Args:
        data (dict): Participant session data including:
            - website_id: Website identifier
            - name: Participant name
            - feedback: Session rating (1-5)
            - session_start_time: Session start timestamp
            - session_end_time: Session end timestamp
            - gaze_points: List of gaze coordinates
    
    Returns:
        dict: Success message and participant ID
    """
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
        participant_id = save_session_participant(data["website_id"], data)
        
        # Generate individual heatmap
        generate_heatmap(data["website_id"], participant_id)
        
        return {
            "message": "Session data uploaded successfully",
            "participant_id": participant_id
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
