import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .controllers.image_controller import router as image_router
from .controllers.heatmap_controller import router as heatmap_router
from .controllers.session_controller import router as session_router
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

# Include routers
app.include_router(image_router)
app.include_router(heatmap_router)
app.include_router(session_router)
app.include_router(website_router)

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "EYEGAZE Backend is running!"}
