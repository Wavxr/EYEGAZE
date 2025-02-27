from fastapi import APIRouter, HTTPException
from ..services.firebase_service import get_website_heatmap_data
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
async def get_website_gaze_data_endpoint(website_id: str):
    try:
        website_doc = db.collection('websites').document(website_id).get()
        if not website_doc.exists:
            raise HTTPException(status_code=404, detail="Website not found")
            
        heatmap_data = get_website_heatmap_data(website_id)
        if not heatmap_data:
            raise HTTPException(status_code=404, detail="Heatmap data not found")
            
        return heatmap_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))