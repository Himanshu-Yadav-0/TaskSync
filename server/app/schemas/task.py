from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from enum import Enum

class TaskStatus(str, Enum):
    pending = "pending"
    completed = "completed"
    in_progress = "in-progress"

class TaskType(str, Enum):
    sod = "sod"
    eod = "eod"

class TaskBase(BaseModel):
    task: str
    description: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    status: TaskStatus

class TaskResponse(TaskBase):
    id: int
    status: TaskStatus
    created_at: datetime
    completed_at: Optional[datetime] = None
    type: TaskType
    
    class Config:
        from_attributes = True

class TaskListCreate(BaseModel):
    tasks: List[TaskCreate]
    type: TaskType = TaskType.sod
    date: Optional[str] = None

class EmailSODRequest(BaseModel):
    tasks: List[TaskCreate]

class EmailEODRequest(BaseModel):
    date: Optional[str] = None 