from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from uuid import uuid4
from services.aws_service import upload_to_s3

router = APIRouter()

@router.post("/upload-html")
async def upload_html(file: UploadFile = File(...), title: str = Form(...)):
    try:
        # Validate file type
        if file.content_type != "text/html":
            raise HTTPException(status_code=400, detail="Only HTML files are allowed")

        # Read the uploaded file content as bytes
        file_content = await file.read()

        # Validate file content
        if not file_content:
            raise HTTPException(status_code=400, detail="Uploaded file is empty")

        # Generate unique session ID
        session_id = str(uuid4())

        # Sanitize file key
        file_key = f"landing_pages/{session_id}_{file.filename}".replace(" ", "_")

        # Upload file to S3
        file_url = upload_to_s3(file_content, file_key, content_type="text/html")

        # Generate participant link
        participant_link = f"http://localhost:5173/session/{session_id}?file_key={file_key}&start_gaze_recorder=true"

        # Debug: Print response before sending to frontend
        response_data = {
            "message": "File uploaded successfully",
            "url": file_url,
            "file_key": file_key,
            "participant_link": participant_link,
            "session_id": session_id,  # Ensure session_id is included
        }
        print("Backend Response:", response_data)

        return response_data
    except Exception as e:
        print(f"Error uploading HTML file: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

