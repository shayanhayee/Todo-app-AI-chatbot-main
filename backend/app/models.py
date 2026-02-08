"""
SQLModel database models for the Todo application.

This module defines the database schema using SQLModel ORM.
Models include User and Task entities with proper relationships.
"""

from __future__ import annotations

from sqlmodel import Field, SQLModel, Relationship
from typing import Optional, TYPE_CHECKING, List, Any
from datetime import datetime
from uuid import uuid4
from enum import Enum
from sqlalchemy.orm import relationship as sa_relationship

if TYPE_CHECKING:
    pass


def generate_uuid() -> str:
    """Generate a UUID string for primary keys."""
    return str(uuid4())


# Base configuration for SQLModel
# All models will inherit from SQLModel with table=True


class User(SQLModel, table=True):
    """
    User model representing authenticated users in the system.

    Attributes:
        id: Unique identifier (UUID as string)
        email: User's email address (unique, indexed)
        name: User's display name
        hashed_password: Bcrypt hashed password (managed by Better Auth)
        created_at: Timestamp of user creation
        tasks: Relationship to user's tasks
    """
    __tablename__ = "users"

    id: Optional[str] = Field(
        default_factory=generate_uuid,
        primary_key=True,
        max_length=36
    )
    email: str = Field(
        unique=True,
        index=True,
        max_length=255
    )
    name: str = Field(max_length=200)
    hashed_password: str = Field(max_length=255)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    def __repr__(self) -> str:
        return f"<User(id={self.id}, email={self.email}, name={self.name})>"

    # Relationships
    conversations: Any = Relationship(
        sa_relationship=sa_relationship(
            "Conversation",
            back_populates="user",
            cascade="all, delete-orphan"
        )
    )


class Task(SQLModel, table=True):
    """
    Task model representing todo items.

    Attributes:
        id: Unique identifier (auto-increment)
        user_id: Foreign key to users table
        title: Task title
        description: Optional task description
        completed: Task completion status
        created_at: Timestamp of task creation
        updated_at: Timestamp of last update
        category: Optional task category (e.g., work, personal, shopping)
        priority: Task priority level (low, medium, high)
        due_date: Optional task deadline
        order: Custom ordering for drag-drop functionality
        user: Relationship to task owner
    """
    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(
        foreign_key="users.id",
        index=True,
        max_length=36
    )
    title: str = Field(max_length=200)
    description: Optional[str] = Field(default=None)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Phase 2 fields - Advanced task management
    category: Optional[str] = Field(default=None, max_length=50)
    priority: Optional[str] = Field(default="medium", max_length=20)
    due_date: Optional[datetime] = Field(default=None)
    order: int = Field(default=0)

    def __repr__(self) -> str:
        return f"<Task(id={self.id}, title={self.title}, completed={self.completed})>"


class MessageRole(str, Enum):
    """Roles for messages in a conversation."""
    USER = "user"
    ASSISTANT = "assistant"
    TOOL = "tool"
    SYSTEM = "system"


class Conversation(SQLModel, table=True):
    """
    Stores metadata for a chat session.
    """
    __tablename__ = "conversations"

    id: Optional[str] = Field(
        default_factory=generate_uuid,
        primary_key=True,
        max_length=36
    )
    user_id: str = Field(
        foreign_key="users.id",
        index=True,
        max_length=36
    )
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    messages: Any = Relationship(
        sa_relationship=sa_relationship(
            "Message",
            back_populates="conversation",
            cascade="all, delete-orphan"
        )
    )
    user: Any = Relationship(
        sa_relationship=sa_relationship("User", back_populates="conversations")
    )


class Message(SQLModel, table=True):
    """
    Stores individual messages within a conversation.
    """
    __tablename__ = "messages"

    id: Optional[str] = Field(
        default_factory=generate_uuid,
        primary_key=True,
        max_length=36
    )
    conversation_id: str = Field(
        foreign_key="conversations.id",
        index=True,
        max_length=36
    )
    role: MessageRole = Field()
    content: str = Field()
    tool_call_id: Optional[str] = Field(default=None, max_length=100)
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    conversation: Any = Relationship(
        sa_relationship=sa_relationship("Conversation", back_populates="messages")
    )



