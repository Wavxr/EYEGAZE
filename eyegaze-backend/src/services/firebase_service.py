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
    Save participant session data to Firebase.
    
    Args:
        website_id: ID of the website document
        participant_data: Dictionary containing:
            - name: Participant's name
            - feedback: Rating (1-5)
            - session_start_time: Session start timestamp
            - session_end_time: Session end timestamp
            - gaze_points: List of gaze points with timestamps
    """
    # Create a new participant document in the website's participants subcollection
    participant_doc = db.collection('websites').document(website_id).collection('participants').document()
    
    # Save participant metadata
    participant_doc.set({
        "name": participant_data.get("name"),
        "feedback": participant_data.get("feedback"),
        "session_start_time": participant_data.get("session_start_time"),
        "session_end_time": participant_data.get("session_end_time"),
        "createdAt": firestore.SERVER_TIMESTAMP
    })
    
    # Save gaze points in a subcollection
    gaze_points = participant_data.get("gaze_points", [])
    gaze_batch = db.batch()
    for point in gaze_points:
        point_doc = participant_doc.collection("gazePoints").document()
        gaze_batch.set(point_doc, {
            "x": point.get("x"),
            "y": point.get("y"),
            "timestamp": point.get("timestamp")
        })
    
    # Commit all gaze points in a single batch
    gaze_batch.commit()
    return participant_doc.id