# src/controllers/gaze_data_controller.py
from fastapi import APIRouter, HTTPException
from services.aws_service import upload_to_s3
import json

router = APIRouter()

@router.post("/upload-gaze-data")
async def upload_gaze_data(data: dict):
    try:
        session_id = data.get("session_id")
        gaze_points = data.get("gaze_points")
        
        if not session_id or not gaze_points:
            raise HTTPException(status_code=400, detail="Missing required fields")
        
        # Upload gaze data to S3
        gaze_data_key = f"gaze_data/{session_id}.json"
        upload_to_s3(json.dumps(gaze_points).encode("utf-8"), gaze_data_key, content_type="application/json")
        
        return {"message": "Gaze data uploaded successfully", "gaze_data_key": gaze_data_key}
    except Exception as e:
        print(f"Error uploading gaze data: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))