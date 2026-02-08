from fastapi import APIRouter, Depends, status, Body
from sqlalchemy.orm import Session
from typing import Optional

from app.dependencies import get_db, get_current_user
from app.models import User
from app.services.chat_service import ChatService

router = APIRouter()

@router.post("")
def chat_with_ai(
    message: str = Body(..., embed=True),
    conversation_id: Optional[str] = Body(None, embed=True),
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_db),
):
    """
    Stateless chat endpoint for interacting with the AI Agent.
    """
    return ChatService.process_chat(
        session=session,
        user_id=current_user.id,
        message_text=message,
        conversation_id=conversation_id
    )
