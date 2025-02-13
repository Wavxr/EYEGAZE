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

def save_website_data(user_id, url, title, dom_s3_key, elements_s3_key, screenshot_s3_key):
    db = firestore.client()

    doc_ref = db.collection('websites').document()
    doc_ref.set({
        'url': url,
        'title': title,
        'dom_s3_key': dom_s3_key,
        'elements_s3_key': elements_s3_key,
        'screenshot_url': screenshot_s3_key,
        'uploaded_at': firestore.SERVER_TIMESTAMP,
        'user_id': user_id
    })
    return doc_ref.id