# Implementation Plan: AI Chatbot (Phase-III)

**Branch**: `002-ai-chatbot` | **Date**: 2026-02-05 | **Spec**: [spec.md](./spec.md)

## Summary
Implement a stateless AI Chatbot layer using Google Gemini API and MCP. The AI will interact with existing Todo CRUD operations through tools, providing a natural language interface for task management.

## Technical Context
**Language/Version**: Python 3.11+  
**Primary Dependencies**: FastAPI, SQLModel, Google Generative AI SDK, MCP Python SDK  
**Storage**: Neon (PostgreSQL)  
**Testing**: Pytest  
**Target Platform**: Render/Railway  
**Project Type**: Full-stack (FastAPI + Next.js)  

## Project Structure (AI Layer)

```text
backend/app/
├── agents/            # OpenAI Agent definitions & Prompts
├── mcp/               # MCP Server & Tool wrapping
├── routes/chat.py     # Stateless POST /chat endpoint
└── services/chat.py   # Chat flow logic
```

## Implementation Phases

### Phase 1: Infrastructure & Data Model
- Add `Conversation` and `Message` tables to `models.py`.
- Run database migrations.

### Phase 2: MCP Tool Mapping
- Wrap existing `routes/tasks.py` logic into MCP tools.
- Implement the MCP server inside the FastAPI app.

### Phase 3: Agent Configuration
- Define Orchestrator and Tool Executor agents.
- Integrate system prompts and tool bindings.

### Phase 4: Chat API & Frontend
- Implement the stateless `/api/chat` endpoint.
- Connect the Next.js frontend to the new chat service.
