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
        participant_data: Dictionary containing participant session data
    """
    # Create a new participant document in the website's participants subcollection
    participant_doc = db.collection('websites').document(website_id).collection('participants').document()
    
    # Save participant metadata
    participant_doc.set({
        "name": participant_data.get("name"),
        "feedback": participant_data.get("feedback"),
        "session_start_time": participant_data.get("session_start_time"),
        "session_end_time": participant_data.get("session_end_time"),
        "gaze_analysis": participant_data.get("gaze_analysis", {}),
        "createdAt": firestore.SERVER_TIMESTAMP
    })
    
    # Save gaze points in a subcollection
    gaze_points = participant_data.get("gaze_points", [])
    gaze_batch = db.batch()
    for point in gaze_points:
        point_doc = participant_doc.collection("gazePoints").document()
        gaze_batch.set(point_doc, point)
    
    # Commit all gaze points in a single batch
    gaze_batch.commit()
    return participant_doc.id

def get_participant_session(website_id: str, participant_id: str) -> dict:
    """
    Retrieve participant session data from Firebase.
    
    Args:
        website_id: ID of the website document
        participant_id: ID of the participant document
        
    Returns:
        Dictionary containing session data including gaze points and analysis
    """
    try:
        # Get website document to get the screenshot URL
        website_doc = db.collection('websites').document(website_id).get()
        if not website_doc.exists:
            return None
            
        website_data = website_doc.to_dict()
        
        # Get participant document
        participant_doc = db.collection('websites').document(website_id)\
            .collection('participants').document(participant_id).get()
        if not participant_doc.exists:
            return None
            
        participant_data = participant_doc.to_dict()
        
        # Get gaze points
        gaze_points = []
        gaze_points_ref = participant_doc.reference.collection('gazePoints').stream()
        for point_doc in gaze_points_ref:
            gaze_points.append(point_doc.to_dict())
            
        # Combine all data
        session_data = {
            **participant_data,
            'gaze_points': gaze_points,
            'screenshot_url': website_data.get('s3FileKey'),  # URL to the website screenshot
            'website_title': website_data.get('title')
        }
        
        return session_data
        
    except Exception as e:
        print(f"Error retrieving session data: {str(e)}")
        return None

def get_website_sessions(website_id: str) -> list:
    """
    Get all participant sessions for a website.
    
    Args:
        website_id: ID of the website document
        
    Returns:
        List of session data with participant info
    """
    try:
        # Get website document
        website_doc = db.collection('websites').document(website_id).get()
        if not website_doc.exists:
            return []
            
        website_data = website_doc.to_dict()
        
        # Get all participants for the website
        participants = db.collection('websites').document(website_id)\
            .collection('participants').stream()
            
        sessions = []
        for participant in participants:
            participant_data = participant.to_dict()
            sessions.append({
                "id": participant.id,
                "name": participant_data.get("name"),
                "feedback": participant_data.get("feedback"),
                "session_start_time": participant_data.get("session_start_time"),
                "session_end_time": participant_data.get("session_end_time"),
                "websiteImageUrl": website_data.get("s3FileKey"),  # S3 URL of the website screenshot
                "createdAt": participant_data.get("createdAt")
            })
            
        return sorted(sessions, key=lambda x: x.get("createdAt", 0), reverse=True)
        
    except Exception as e:
        print(f"Error getting website sessions: {str(e)}")
        return []

def get_participant_gaze_data(website_id: str, participant_id: str) -> dict:
    """
    Get participant's gaze data for heatmap visualization.
    
    Args:
        website_id: ID of the website document
        participant_id: ID of the participant document
        
    Returns:
        Dictionary containing gaze points and website image URL
    """
    try:
        # Get website document to get the screenshot URL
        website_doc = db.collection('websites').document(website_id).get()
        if not website_doc.exists:
            return None
            
        website_data = website_doc.to_dict()
        
        # Get participant document
        participant_doc = db.collection('websites').document(website_id)\
            .collection('participants').document(participant_id).get()
            
        if not participant_doc.exists:
            return None
            
        participant_data = participant_doc.to_dict()
        
        # Get all gaze points
        gaze_points = []
        gaze_points_docs = participant_doc.collection("gazePoints").stream()
        for point in gaze_points_docs:
            point_data = point.to_dict()
            gaze_points.append({
                "x": point_data.get("x"),
                "y": point_data.get("y"),
                "timestamp": point_data.get("timestamp")
            })
            
        return {
            "participant": {
                "id": participant_id,
                "name": participant_data.get("name"),
                "feedback": participant_data.get("feedback"),
                "session_start_time": participant_data.get("session_start_time"),
                "session_end_time": participant_data.get("session_end_time")
            },
            "websiteImageUrl": website_data.get("s3FileKey"),
            "gaze_points": sorted(gaze_points, key=lambda x: x.get("timestamp", 0))
        }
        
    except Exception as e:
        print(f"Error getting participant gaze data: {str(e)}")
        return None
