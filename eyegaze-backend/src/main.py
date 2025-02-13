import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.html_upload_controller import router as html_upload_router
from controllers.html_serve_controller import router as html_serve_router
from controllers.gaze_data_controller import router as gaze_data_router

# Load environment variables from .env file
load_dotenv()

# Debugging: Print credentials to verify they are loaded
print(f"Main.py AWS_ACCESS_KEY_ID: {os.getenv('AWS_ACCESS_KEY_ID')}")
print(f"main.py AWS_SECRET_ACCESS_KEY: {'Loaded' if os.getenv('AWS_SECRET_ACCESS_KEY') else 'Not Found'}")

app = FastAPI()

# Define allowed origins for CORS
origins = [
    "http://localhost:5173",  # Local frontend URL (if using Vite)
    "https://your-frontend-url.com",  # Live frontend URL
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers for different functionalities
app.include_router(html_upload_router, prefix="/api")
app.include_router(html_serve_router, prefix="/api")
app.include_router(gaze_data_router, prefix="/api")

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "EYEGAZE Backend is running!"}
