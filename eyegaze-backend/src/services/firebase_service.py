# src/services/firebase_service.py
import os
from dotenv import load_dotenv
from firebase_admin import credentials, firestore, initialize_app


load_dotenv()

private_key = os.getenv("FIREBASE_PRIVATE_KEY")
if private_key is None:
    raise ValueError("FIREBASE_PRIVATE_KEY is not set in the environment variables")


# Load Firebase credentials from environment variables
cred = credentials.Certificate({
    "type": "service_account",
    "project_id": os.getenv("FIREBASE_PROJECT_ID"),
    "private_key_id": "1981cba368e0f1058b9bfc875daa555e7fa39342",
    "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace("\\n", "\n"),
    "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
    "client_id": "109403225668998974917",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40eyegaze-5a6f0.iam.gserviceaccount.com"
})

initialize_app(cred)
db = firestore.client()

def save_website_data(owner_id: str, owner_name: str, title: str, guideline: str, s3_file_key: str, participant_link: str):
    website_data = {
        "ownerId": owner_id,
        "ownerName": owner_name,
        "title": title,
        "guideline": guideline,
        "s3FileKey": s3_file_key,
        "participantLink": participant_link,
        "createdAt": firestore.SERVER_TIMESTAMP
    }
    doc_ref = db.collection('websites').document()
    doc_ref.set(website_data)
    return doc_ref.id

def save_session_participant(session_id: str, participant_data: dict):
    """
    Save participant session data under sessions/{session_id}/participants.
    The participant_data dictionary should include:
      - name: string
      - feedback: number (1-5)
      - session_start_time: timestamp (number)
      - session_end_time: timestamp (number)
      - gaze_points: list of { x: number, y: number, timestamp: number }
    """
    session_ref = db.collection('sessions').document(session_id)
    participant_doc = session_ref.collection('participants').document()  # auto-generated ID

    # Prepare participant document payload.
    participant_payload = {
        "name": participant_data.get("name"),
        "feedback": participant_data.get("feedback"),
        "session_start_time": participant_data.get("session_start_time"),
        "session_end_time": participant_data.get("session_end_time"),
        "createdAt": firestore.SERVER_TIMESTAMP
    }
    participant_doc.set(participant_payload)

    # Save each gaze point as a document in the "gazeData" subcollection.
    gaze_points = participant_data.get("gaze_points", [])
    for point in gaze_points:
        participant_doc.collection("gazeData").add({
            "x": point.get("x"),
            "y": point.get("y"),
            "timestamp": point.get("timestamp")
        })
    return participant_doc.id