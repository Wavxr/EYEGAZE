import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .controllers.html_upload_controller import router as html_upload_router
from .controllers.html_serve_controller import router as html_serve_router
from .controllers.gaze_data_controller import router as gaze_data_router

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Define allowed origins for CORS
origins = [
    "http://localhost:5173", 
    "https://your-frontend-url.com", 
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
