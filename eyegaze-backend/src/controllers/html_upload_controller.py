from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from uuid import uuid4
from services.aws_service import upload_to_s3

router = APIRouter()

@router.post("/upload-html")
async def upload_html(file: UploadFile = File(...), title: str = Form(...)):
    """
    Endpoint to handle uploading an HTML file and returning session details.
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

        return {
            "message": "File uploaded successfully",
            "url": file_url,
            "file_key": file_key,
            "participant_link": (
                f"http://localhost:5173/session/{session_id}"
                f"?file_key={file_key}&start_gaze_recorder=true"
            ),
            "session_id": session_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
