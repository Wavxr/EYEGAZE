import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .controllers.image_upload_controller import router as image_upload_router
from .controllers.image_serve_controller import router as image_serve_router
from .controllers.gaze_data_controller import router as gaze_data_router
from .controllers.website_controller import router as website_router

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# main.py
app.include_router(image_upload_router)
app.include_router(image_serve_router)
app.include_router(gaze_data_router)
app.include_router(website_router)


# Root endpoint
@app.get("/")
def read_root():
    return {"message": "EYEGAZE Backend is running!"}
