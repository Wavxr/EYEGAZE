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
    
    doc_ref = db.collection('websites').document()
    doc_ref.set(website_data)
    return doc_ref.id

def save_session_participant(website_id: str, participant_data: dict):
    """
    Save participant session data to Firebase as a separate collection.
    """
    session_data = {
        "websiteId": website_id,  # Reference to website
        "name": participant_data.get("name"),
        "feedback": participant_data.get("feedback"),
        "session_start_time": participant_data.get("session_start_time"),
        "session_end_time": participant_data.get("session_end_time"),
        "gaze_points": participant_data.get("gaze_points", []),  # Store directly in document
        "createdAt": firestore.SERVER_TIMESTAMP
    }
    
    doc_ref = db.collection('sessions').document()
    doc_ref.set(session_data)
    return doc_ref.id

def get_participant_session(website_id: str, session_id: str) -> dict:
    """
    Retrieve participant session data from Firebase.
    """
    try:
        # Get website document
        website_doc = db.collection('websites').document(website_id).get()
        if not website_doc.exists:
            return None
            
        website_data = website_doc.to_dict()
        
        # Get session document
        session_doc = db.collection('sessions').document(session_id).get()
        if not session_doc.exists:
            return None
            
        session_data = session_doc.to_dict()
            
        # Combine data
        return {
            **session_data,
            'screenshot_url': website_data.get('s3FileKey'),
            'website_title': website_data.get('title')
        }
        
    except Exception as e:
        print(f"Error retrieving session data: {str(e)}")
        return None

def get_website_sessions(website_id: str) -> list:
    """
    Get all sessions for a website.
    """
    try:
        # Get website document
        website_doc = db.collection('websites').document(website_id).get()
        if not website_doc.exists:
            return []
            
        website_data = website_doc.to_dict()
        
        # Query sessions collection for this website
        sessions = db.collection('sessions')\
            .where('websiteId', '==', website_id)\
            .stream()
            
        sessions_list = []
        for session in sessions:
            session_data = session.to_dict()
            sessions_list.append({
                "id": session.id,
                "name": session_data.get("name"),
                "feedback": session_data.get("feedback"),
                "session_start_time": session_data.get("session_start_time"),
                "session_end_time": session_data.get("session_end_time"),
                "websiteImageUrl": website_data.get("s3FileKey"),
                "createdAt": session_data.get("createdAt")
            })
            
        return sorted(sessions_list, key=lambda x: x.get("createdAt", 0), reverse=True)
        
    except Exception as e:
        print(f"Error getting website sessions: {str(e)}")
        return []