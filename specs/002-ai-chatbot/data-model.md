# Data Model: AI Chatbot persistence

## Entities

### 1. Conversation
Represents a unique chat session between a user and the AI.

| Attribute | Type | Description |
|-----------|------|-------------|
| id | UUID (string) | Unique identifier |
| user_id | UUID (string) | Foreign key to `users.id` |
| created_at | DateTime | Initialization timestamp |
| updated_at | DateTime | Last message timestamp |

### 2. Message
Individual message records that form the conversation history.

| Attribute | Type | Description |
|-----------|------|-------------|
| id | UUID (string) | Unique identifier |
| conversation_id | UUID (string) | Foreign key to `conversations.id` |
| role | Enum | user, assistant, system, tool |
| content | Text | The message body |
| tool_call_id | String (optional) | ID for tool response mapping |
| timestamp | DateTime | Creation timestamp |

## Relationships
- **User (1) <-> Conversation (N)**: A user can have many chat history threads.
- **Conversation (1) <-> Message (N)**: A conversation contains multiple messages.
