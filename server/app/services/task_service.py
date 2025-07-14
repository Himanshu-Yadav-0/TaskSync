from sqlalchemy.orm import Session
from sqlalchemy import and_, func, text
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate, TaskType
from datetime import datetime, timedelta
from typing import List, Optional

class TaskService:
    
    @staticmethod
    def create_tasks(db: Session, tasks: List[TaskCreate], task_type: TaskType, date: Optional[str] = None) -> List[Task]:
        """Create multiple tasks for a specific date"""
        db_tasks = []
        task_date = datetime.strptime(date, "%Y-%m-%d") if date else datetime.utcnow()
        
        for task_data in tasks:
            db_task = Task(
                task=task_data.task,
                description=task_data.description,
                type=task_type.value,
                created_at=task_date
            )
            db.add(db_task)
            db_tasks.append(db_task)
        
        db.commit()
        for task in db_tasks:
            db.refresh(task)
        return db_tasks
    
    @staticmethod
    def get_tasks_by_date(db: Session, date: str) -> List[Task]:
        """Get all tasks for a specific date"""
        try:
            target_date = datetime.strptime(date, "%Y-%m-%d").date()
            return db.query(Task).filter(
                func.date(Task.created_at) == target_date
            ).order_by(Task.created_at.desc()).all()
        except ValueError:
            # If date parsing fails, return empty list
            return []
    
    @staticmethod
    def update_task_status(db: Session, task_id: int, status_update: TaskUpdate) -> Optional[Task]:
        """Update task status and completion time"""
        db_task = db.query(Task).filter(Task.id == task_id).first()
        if not db_task:
            return None
        
        db_task.status = status_update.status.value
        if status_update.status.value == "completed":
            db_task.completed_at = datetime.utcnow()
        else:
            db_task.completed_at = None
        
        db.commit()
        db.refresh(db_task)
        return db_task
    
    @staticmethod
    def get_yesterday_pending_tasks(db: Session) -> List[Task]:
        """Get pending tasks from yesterday"""
        yesterday = datetime.utcnow().date() - timedelta(days=1)
        return db.query(Task).filter(
            and_(
                func.date(Task.created_at) == yesterday,
                Task.status == "pending"
            )
        ).order_by(Task.created_at.desc()).all()
    
    @staticmethod
    def get_task_by_id(db: Session, task_id: int) -> Optional[Task]:
        """Get a single task by ID"""
        return db.query(Task).filter(Task.id == task_id).first()
    
    @staticmethod
    def delete_task(db: Session, task_id: int) -> bool:
        """Delete a task by ID"""
        db_task = db.query(Task).filter(Task.id == task_id).first()
        if not db_task:
            return False
        
        db.delete(db_task)
        db.commit()
        return True 