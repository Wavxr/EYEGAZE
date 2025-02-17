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
    """
    Save website testing data to Firebase.
    """
    website_data = {
        "ownerId": owner_id,
        "ownerName": owner_name,
        "title": title,
        "guideline": guideline,
        "s3FileKey": s3_file_key,
        "participantLink": participant_link,
        "createdAt": firestore.SERVER_TIMESTAMP
    }
    
    # Create a new document in the websites collection
    doc_ref = db.collection('websites').document()
    doc_ref.set(website_data)
    return doc_ref.id

def save_session_participant(website_id: str, participant_data: dict):
    """
    Save participant session data to Firebase in a separate top-level collection.

    Args:
        website_id: ID of the website document to reference.
        participant_data: Dictionary containing:
            - name: Participant's name.
            - feedback: Rating (1-5).
            - session_start_time: Session start timestamp.
            - session_end_time: Session end timestamp.
            - gaze_points: List of gaze points with timestamps.
    
    The gaze points are stored as a single array object within the participant document.
    """
    # Create a new document in the participant_sessions collection
    session_doc = db.collection('participant_sessions').document()

    # Save the session data along with the reference to the website ID
    session_doc.set({
        "website_id": website_id,
        "name": participant_data.get("name"),
        "feedback": participant_data.get("feedback"),
        "session_start_time": participant_data.get("session_start_time"),
        "session_end_time": participant_data.get("session_end_time"),
        "gaze_points": participant_data.get("gaze_points"),
        "createdAt": firestore.SERVER_TIMESTAMP
    })
    
    return session_doc.id
