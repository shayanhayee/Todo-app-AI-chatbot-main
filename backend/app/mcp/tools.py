from typing import Optional, List
from datetime import datetime
from sqlalchemy.orm import Session
from app.services.task_service import TaskService
from app.schemas import TaskCreateRequest, TaskUpdateRequest, TaskResponse

def add_task_tool(
    session: Session,
    user_id: str,
    title: str,
    description: Optional[str] = None,
    category: Optional[str] = None,
    priority: str = "medium",
    due_date: Optional[str] = None
) -> str:
    """Add a new task to the todo list."""
    dt_due_date = datetime.fromisoformat(due_date) if due_date else None
    task_data = TaskCreateRequest(
        title=title,
        description=description,
        category=category,
        priority=priority,
        due_date=dt_due_date
    )
    task = TaskService.create_task(session, user_id, task_data)
    return f"Task created successfully: '{task.title}' (ID: {task.id})"

def list_tasks_tool(
    session: Session,
    user_id: str,
    completed: Optional[bool] = None
) -> str:
    """List tasks from the todo list."""
    tasks = TaskService.list_tasks(session, user_id, completed)
    if not tasks:
        return "You have no tasks in your list."
    
    output = "Here are your tasks:\n"
    for t in tasks:
        status = "✅" if t.completed else "❌"
        priority = f"[{t.priority.upper()}]" if t.priority else ""
        output += f"- {status} {priority} {t.title} (ID: {t.id})\n"
    return output

def update_task_tool(
    session: Session,
    user_id: str,
    task_id: int,
    title: Optional[str] = None,
    description: Optional[str] = None,
    completed: Optional[bool] = None,
    category: Optional[str] = None,
    priority: Optional[str] = None,
    due_date: Optional[str] = None
) -> str:
    """Update an existing task."""
    dt_due_date = datetime.fromisoformat(due_date) if due_date else None
    task_data = TaskUpdateRequest(
        title=title,
        description=description,
        completed=completed,
        category=category,
        priority=priority,
        due_date=dt_due_date
    )
    task = TaskService.update_task(session, user_id, task_id, task_data)
    return f"Task {task.id} updated successfully."

def delete_task_tool(
    session: Session,
    user_id: str,
    task_id: int
) -> str:
    """Delete a task from the list."""
    TaskService.delete_task(session, user_id, task_id)
    return f"Task {task_id} deleted successfully."

def complete_task_tool(
    session: Session,
    user_id: str,
    task_id: int
) -> str:
    """Toggle the completion status of a task."""
    task = TaskService.toggle_task(session, user_id, task_id)
    status = "completed" if task.completed else "not completed"
    return f"Task {task.id} marked as {status}."
