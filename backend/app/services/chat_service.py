from sqlalchemy.orm import Session
from sqlalchemy import select
from datetime import datetime
from typing import List, Optional, Dict, Any

from app.models import Conversation, Message, MessageRole
from app.agents.orchestrator import AgentOrchestrator

class ChatService:
    @staticmethod
    def get_or_create_conversation(session: Session, user_id: str, conversation_id: Optional[str] = None) -> Conversation:
        if conversation_id:
            result = session.execute(
                select(Conversation).where(Conversation.id == conversation_id, Conversation.user_id == user_id)
            )
            conversation = result.scalar_one_or_none()
            if conversation:
                return conversation
        
        # Create new conversation if not found or not provided
        new_conv = Conversation(user_id=user_id)
        session.add(new_conv)
        session.commit()
        session.refresh(new_conv)
        return new_conv

    @staticmethod
    def get_history(session: Session, conversation_id: str, limit: int = 10) -> List[Dict[str, Any]]:
        result = session.execute(
            select(Message)
            .where(Message.conversation_id == conversation_id)
            .order_by(Message.timestamp.asc())
            .limit(limit)
        )
        messages = result.scalars().all()
        return [{"role": m.role.value, "content": m.content} for m in messages]

    @staticmethod
    def save_message(session: Session, conversation_id: str, role: MessageRole, content: str):
        message = Message(
            conversation_id=conversation_id,
            role=role,
            content=content
        )
        session.add(message)
        session.commit()

    @staticmethod
    def process_chat(session: Session, user_id: str, message_text: str, conversation_id: Optional[str] = None) -> Dict[str, Any]:
        # 1. Get/Create Conversation
        conversation = ChatService.get_or_create_conversation(session, user_id, conversation_id)
        
        # 2. Save User Message
        ChatService.save_message(session, conversation.id, MessageRole.USER, message_text)
        
        # 3. Get History
        history = ChatService.get_history(session, conversation.id)
        
        # 4. Run Agent
        orchestrator = AgentOrchestrator(session, user_id)
        ai_response = orchestrator.run_chat(history[:-1], message_text) # History excluding the one we just saved to avoid duplication in messages list
        
        # 5. Save AI Response
        ChatService.save_message(session, conversation.id, MessageRole.ASSISTANT, ai_response)
        
        # 6. Update conversation timestamp
        conversation.updated_at = datetime.utcnow()
        session.commit()
        
        return {
            "response": ai_response,
            "conversation_id": conversation.id,
            "status": "success"
        }
