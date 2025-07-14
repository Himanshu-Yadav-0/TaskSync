from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
from app.config.database import get_db
from app.schemas.task import TaskResponse, TaskListCreate, TaskUpdate
from app.services.task_service import TaskService
from datetime import datetime

router = APIRouter()

@router.post("/tasks", response_model=List[TaskResponse])
async def create_tasks(
    task_data: TaskListCreate,
    db: Session = Depends(get_db)
):
    """Create multiple tasks for a specific date"""
    try:
        created_tasks = TaskService.create_tasks(
            db=db,
            tasks=task_data.tasks,
            task_type=task_data.type,
            date=task_data.date
        )
        return created_tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create tasks: {str(e)}")

@router.get("/tasks/by-date", response_model=List[TaskResponse])
async def get_tasks_by_date(
    date: str = Query(..., description="Date in YYYY-MM-DD format"),
    db: Session = Depends(get_db)
):
    """Get all tasks for a specific date"""
    try:
        tasks = TaskService.get_tasks_by_date(db=db, date=date)
        return tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch tasks: {str(e)}")

@router.put("/tasks/{task_id}", response_model=TaskResponse)
async def update_task_status(
    task_id: int,
    task_update: TaskUpdate,
    db: Session = Depends(get_db)
):
    """Update task status"""
    try:
        updated_task = TaskService.update_task_status(
            db=db,
            task_id=task_id,
            status_update=task_update
        )
        if not updated_task:
            raise HTTPException(status_code=404, detail="Task not found")
        return updated_task
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update task: {str(e)}")

@router.get("/tasks/yesterday-pending", response_model=List[TaskResponse])
async def get_yesterday_pending_tasks(db: Session = Depends(get_db)):
    """Get pending tasks from yesterday"""
    try:
        pending_tasks = TaskService.get_yesterday_pending_tasks(db=db)
        return pending_tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch pending tasks: {str(e)}")

@router.get("/tasks/{task_id}", response_model=TaskResponse)
async def get_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    """Get a single task by ID"""
    try:
        task = TaskService.get_task_by_id(db=db, task_id=task_id)
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        return task
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch task: {str(e)}")

@router.delete("/tasks/{task_id}")
async def delete_task(
    task_id: int,
    db: Session = Depends(get_db)
):
    """Delete a task by ID"""
    try:
        success = TaskService.delete_task(db=db, task_id=task_id)
        if not success:
            raise HTTPException(status_code=404, detail="Task not found")
        return {"message": "Task deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete task: {str(e)}") 