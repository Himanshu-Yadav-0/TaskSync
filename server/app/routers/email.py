from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.schemas.task import EmailSODRequest, EmailEODRequest
from app.services.email_service import EmailService
from app.services.task_service import TaskService
from datetime import datetime

router = APIRouter()

@router.post("/send-sod-email")
async def send_sod_email(
    email_request: EmailSODRequest,
    db: Session = Depends(get_db)
):
    """Send Start of Day email with planned tasks"""
    try:
        success = EmailService.send_sod_email(email_request.tasks)
        if success:
            return {"message": "SOD email sent successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to send SOD email")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send SOD email: {str(e)}")

@router.post("/send-eod-email")
async def send_eod_email(
    email_request: EmailEODRequest,
    db: Session = Depends(get_db)
):
    """Send End of Day email with task completion status"""
    try:
        # Get date from request or use today
        date_str = email_request.date
        if not date_str:
            date_str = datetime.now().strftime('%Y-%m-%d')
        
        # Fetch tasks for the specified date
        tasks = TaskService.get_tasks_by_date(db=db, date=date_str)
        
        # Send email
        success = EmailService.send_eod_email(tasks, date_str)
        if success:
            return {"message": "EOD email sent successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to send EOD email")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send EOD email: {str(e)}") 