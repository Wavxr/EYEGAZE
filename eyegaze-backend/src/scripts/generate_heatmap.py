import cv2
import numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage import gaussian_filter
import json
import os
import requests
import io
from firebase_admin import firestore
from ..services.aws_service import upload_to_s3, download_from_s3
from ..services.firebase_service import db

def get_website_data(website_id, session_id=None):
    print(f"Fetching website data for ID: {website_id}")
    try:
        website_doc = db.collection('websites').document(website_id).get()
        if not website_doc.exists:
            print("Website not found")
            return None
            
        website_data = website_doc.to_dict()
        
        all_gaze_points = []
        if session_id:
            # Get specific session data
            print(f"Fetching session data for ID: {session_id}")
            session = db.collection('sessions').document(session_id).get()
            if session.exists:
                session_data = session.to_dict()
                all_gaze_points.extend(session_data.get("gaze_points", []))
        else:
            # Get all sessions for this website
            print("Fetching all sessions data...")
            sessions = db.collection('sessions')\
                .where('websiteId', '==', website_id)\
                .stream()
                
            for session in sessions:
                session_data = session.to_dict()
                all_gaze_points.extend(session_data.get("gaze_points", []))
        
        print(f"Found {len(all_gaze_points)} gaze points")
        return {
            "image_key": website_data.get("s3FileKey"),
            "gaze_points": all_gaze_points
        }
    except Exception as e:
        print(f"Error fetching website data: {str(e)}")
        return None

def generate_heatmap(website_id, session_id=None):
    print("Starting heatmap generation process...")
    
    # Get website data
    website_data = get_website_data(website_id)
    if not website_data:
        print("Failed to get website data")
        return False
    
    print("Downloading website image from S3...")
    # Download image from S3
    image_data = download_from_s3(website_data["image_key"])
    if not image_data:
        print("Failed to download image from S3")
        return False
    
    # Convert image data to numpy array
    print("Converting image data...")
    nparr = np.frombuffer(image_data, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    print(f"Image shape: {image.shape}")
    
    # Create empty heatmap
    print("Creating heatmap...")
    heatmap = np.zeros((image.shape[0], image.shape[1]), dtype=np.float32)
    
    # Plot gaze points
    print("Plotting gaze points...")
    dot_size = 30
    sigma = 50
    intensity = 1.0
    
    for point in website_data["gaze_points"]:
        x, y = int(float(point["x"])), int(float(point["y"]))
        if 0 <= y < heatmap.shape[0] and 0 <= x < heatmap.shape[1]:
            cv2.circle(heatmap, (x, y), dot_size, intensity, -1)
    
    print("Applying Gaussian blur...")
    heatmap = gaussian_filter(heatmap, sigma)
    
    # Normalize heatmap
    heatmap = heatmap / np.max(heatmap) if np.max(heatmap) > 0 else heatmap
    
    print("Creating colored heatmap...")
    colored_heatmap = cv2.applyColorMap(
        (heatmap * 255).astype(np.uint8),
        cv2.COLORMAP_JET
    )
    colored_heatmap = cv2.cvtColor(colored_heatmap, cv2.COLOR_BGR2RGB)
    
    # Create mask and blend
    print("Blending heatmap with original image...")
    mask = heatmap > 0.05
    mask = mask.astype(np.float32)
    
    alpha = 0.7
    result = image.copy()
    for c in range(3):
        result[:, :, c] = image[:, :, c] * (1 - alpha * mask) + \
                         colored_heatmap[:, :, c] * (alpha * mask)
    
    # Save to temporary file
    print("Saving temporary file...")
    temp_path = f"temp_heatmap_{website_id}.jpg"
    cv2.imwrite(temp_path, cv2.cvtColor(result.astype(np.uint8), cv2.COLOR_RGB2BGR))
    
    # Upload to S3
    print("Uploading heatmap to S3...")
    s3_key = f"heatmaps/{website_id}_heatmap.jpg"
    try:
        # Read file as binary
        with open(temp_path, 'rb') as f:
            file_bytes = f.read()
        
        # Upload bytes directly
        upload_success = upload_to_s3(file_bytes, s3_key)
        
        if not upload_success:
            print("Upload to S3 failed")
            return False
            
    except Exception as e:
        print(f"Error during upload process: {e}")
        return False
    finally:
        # Clean up temporary file
        try:
            if os.path.exists(temp_path):
                os.remove(temp_path)
        except Exception as e:
            print(f"Error removing temporary file: {e}")
    print("Updating Firebase with heatmap URL...")
    try:
        # Update Firebase with heatmap URL
        website_ref = db.collection('websites').document(website_id)
        website_ref.update({
            "heatmapUrl": s3_key
        })
        print("Process completed successfully!")
        return True
    except Exception as e:
        print(f"Error updating Firebase: {e}")
        return False
    else:
        print("Failed to upload heatmap to S3")
        return False

def main():
    # Example usage
    website_id = "your_website_id"  # Replace with actual website ID
    print(f"Starting heatmap generation for website ID: {website_id}")
    success = generate_heatmap(website_id)
    if success:
        print("Heatmap generation and upload completed successfully")
    else:
        print("Heatmap generation or upload failed")

if __name__ == "__main__":
    main()