from sqlalchemy.orm import Session
from sqlalchemy import select
from datetime import datetime
from typing import List, Optional
from fastapi import HTTPException, status

from app.models import Task, User
from app.schemas import TaskCreateRequest, TaskUpdateRequest


class TaskService:
    @staticmethod
    def list_tasks(
        session: Session, 
        user_id: str, 
        completed: Optional[bool] = None
    ) -> List[Task]:
        query = select(Task).where(Task.user_id == user_id)
        if completed is not None:
            query = query.where(Task.completed == completed)
        
        query = query.order_by(Task.created_at.desc())
        result = session.execute(query)
        return list(result.scalars().all())

    @staticmethod
    def create_task(
        session: Session, 
        user_id: str, 
        task_data: TaskCreateRequest
    ) -> Task:
        new_task = Task(
            user_id=user_id,
            title=task_data.title,
            description=task_data.description,
            category=task_data.category,
            priority=task_data.priority,
            due_date=task_data.due_date,
            completed=False,
        )
        session.add(new_task)
        session.commit()
        session.refresh(new_task)
        return new_task

    @staticmethod
    def get_task(
        session: Session, 
        user_id: str, 
        task_id: int
    ) -> Task:
        result = session.execute(
            select(Task).where(Task.id == task_id, Task.user_id == user_id)
        )
        task = result.scalar_one_or_none()
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found",
            )
        return task

    @staticmethod
    def update_task(
        session: Session, 
        user_id: str, 
        task_id: int, 
        task_data: TaskUpdateRequest
    ) -> Task:
        task = TaskService.get_task(session, user_id, task_id)
        
        if task_data.title is not None:
            task.title = task_data.title
        if task_data.description is not None:
            task.description = task_data.description
        if task_data.completed is not None:
            task.completed = task_data.completed
        if task_data.category is not None:
            task.category = task_data.category
        if task_data.priority is not None:
            task.priority = task_data.priority
        if task_data.due_date is not None:
            task.due_date = task_data.due_date
        if task_data.order is not None:
            task.order = task_data.order

        task.updated_at = datetime.utcnow()
        session.commit()
        session.refresh(task)
        return task

    @staticmethod
    def delete_task(
        session: Session, 
        user_id: str, 
        task_id: int
    ) -> None:
        task = TaskService.get_task(session, user_id, task_id)
        session.delete(task)
        session.commit()

    @staticmethod
    def toggle_task(
        session: Session, 
        user_id: str, 
        task_id: int
    ) -> Task:
        task = TaskService.get_task(session, user_id, task_id)
        task.completed = not task.completed
        task.updated_at = datetime.utcnow()
        session.commit()
        session.refresh(task)
        return task
