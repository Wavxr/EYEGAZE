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

# Website-related functions
def create_website(owner_id: str, owner_name: str, title: str, guideline: str, s3_file_key: str, participant_link: str):
    """
    Create a new website entry in Firebase.
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

def list_all_websites() -> list:
    """
    List all websites from Firebase, sorted by creation date.
    """
    try:
        websites = db.collection('websites').stream()
        websites_list = []
        
        for website in websites:
            website_data = website.to_dict()
            websites_list.append({
                "id": website.id,
                "title": website_data.get("title"),
                "guideline": website_data.get("guideline"),
                "ownerName": website_data.get("ownerName"),
                "createdAt": website_data.get("createdAt")
            })
            
        return sorted(websites_list, key=lambda x: x.get("createdAt", 0), reverse=True)
    except Exception as e:
        print(f"Error listing websites: {str(e)}")
        return []

# Session-related functions
def create_session(website_id: str, participant_data: dict):
    """
    Create a new participant session in Firebase.
    """
    session_data = {
        "websiteId": website_id,
        "name": participant_data.get("name"),
        "feedback": participant_data.get("feedback"),
        "session_start_time": participant_data.get("session_start_time"),
        "session_end_time": participant_data.get("session_end_time"),
        "gaze_points": participant_data.get("gaze_points", []),
        "createdAt": firestore.SERVER_TIMESTAMP
    }
    
    doc_ref = db.collection('sessions').document()
    doc_ref.set(session_data)
    return doc_ref.id

def get_session_details(website_id: str, session_id: str) -> dict:
    """
    Get detailed information about a specific session.
    """
    try:
        website_doc = db.collection('websites').document(website_id).get()
        if not website_doc.exists:
            return None
            
        website_data = website_doc.to_dict()
        session_doc = db.collection('sessions').document(session_id).get()
        if not session_doc.exists:
            return None
            
        session_data = session_doc.to_dict()
        return {
            **session_data,
            'screenshot_url': website_data.get('s3FileKey'),
            'website_title': website_data.get('title')
        }
    except Exception as e:
        print(f"Error getting session details: {str(e)}")
        return None

def list_website_sessions(website_id: str) -> list:
    """
    List all sessions for a specific website.
    """
    try:
        website_doc = db.collection('websites').document(website_id).get()
        if not website_doc.exists:
            return []
            
        website_data = website_doc.to_dict()
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
        print(f"Error listing sessions: {str(e)}")
        return []

def get_session_gazepoints_data(website_id: str, session_id: str) -> dict:
    """
    Get website data and gaze points for a specific session.
    Can be used for individual heatmaps, saccade analysis, or other visualizations.
    """
    try:
        website_doc = db.collection('websites').document(website_id).get()
        if not website_doc.exists:
            return None
            
        website_data = website_doc.to_dict()
        
        session_doc = db.collection('sessions').document(session_id).get()
        if not session_doc.exists:
            return None
            
        session_data = session_doc.to_dict()
        
        return {
            "imageUrl": website_data.get("s3FileKey"),
            "websiteTitle": website_data.get("title"),
            "gazePoints": session_data.get("gaze_points", []),
            "participantLink": website_data.get("participantLink"),
            "sessionId": session_id,
            "participantName": session_data.get("name")
        }
    except Exception as e:
        print(f"Error getting session gazepoints data: {str(e)}")
        return None
