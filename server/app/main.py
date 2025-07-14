from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.database import engine
from app.models import task
from app.routers import tasks, email
import os
from dotenv import load_dotenv

load_dotenv()

# Create database tables
task.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SOD/EOD Task Tracker API",
    description="A FastAPI backend for SOD/EOD task tracking and email automation",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(tasks.router, prefix="/api", tags=["tasks"])
app.include_router(email.router, prefix="/api", tags=["email"])

@app.get("/")
async def root():
    return {"message": "SOD/EOD Task Tracker API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 5000))
    uvicorn.run(app, host="0.0.0.0", port=port) 