# eyegaze-backend/src/controllers/html_upload_controller.py
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from uuid import uuid4
from services.aws_service import upload_to_s3
from services.firebase_service import save_website_data

router = APIRouter()

@router.post("/upload-html")
async def upload_html(
    file: UploadFile = File(...),
    title: str = Form(...),
    guideline: str = Form(...),
    owner_id: str = Form(...),      # Now required from the frontend
    owner_name: str = Form(...)       # Now required from the frontend
):
    """
    Upload an HTML file and save website metadata to Firestore.
    """
    try:
        if file.content_type != "text/html":
            raise HTTPException(status_code=400, detail="Only HTML files are allowed.")

        file_content = await file.read()
        if not file_content:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")

        session_id = str(uuid4())
        file_key = f"landing_pages/{session_id}_{file.filename}".replace(" ", "_")

        file_url = upload_to_s3(file_content, file_key, content_type="text/html")

        # Generate participant link with start_gaze_recorder flag
        participant_link = (
            f"http://localhost:5173/session/{session_id}"
            f"?file_key={file_key}&start_gaze_recorder=true"
        )

        # Save website metadata to Firestore using the provided auth data
        website_id = save_website_data(
            owner_id=owner_id,
            owner_name=owner_name,
            title=title,
            guideline=guideline,
            s3_file_key=file_key,
            participant_link=participant_link
        )

        return {
            "message": "File uploaded successfully",
            "url": file_url,
            "file_key": file_key,
            "participant_link": participant_link,
            "session_id": session_id,
            "website_id": website_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
