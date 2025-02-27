from fastapi import APIRouter, HTTPException
from ..services.firebase_service import get_session_gazepoints_data, list_website_sessions
from ..scripts.generate_heatmap import generate_heatmap
from ..services.firebase_service import db

router = APIRouter()

@router.post("/generate-heatmap/{website_id}")
async def generate_heatmap_endpoint(website_id: str, session_id: str = None):
    try:
        success = generate_heatmap(website_id, session_id)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to generate heatmap")
        return {"message": "Heatmap generated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/website-gaze-data/{website_id}")
async def get_website_gaze_data_endpoint(website_id: str, session_id: str = None):
    try:
        if session_id:
            gaze_data = get_session_gazepoints_data(website_id, session_id)
        else:
            # Get all sessions for the website
            sessions = list_website_sessions(website_id)
            if not sessions:
                raise HTTPException(status_code=404, detail="No sessions found")
            
            # Get the first session's data as default
            gaze_data = get_session_gazepoints_data(website_id, sessions[0]["id"])
            
        if not gaze_data:
            raise HTTPException(status_code=404, detail="Gaze data not found")
            
        return gaze_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/website-sessions/{website_id}")
async def get_website_sessions_endpoint(website_id: str):
    try:
        sessions = list_website_sessions(website_id)
        if not sessions:
            raise HTTPException(status_code=404, detail="No sessions found")
        return sessions
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))