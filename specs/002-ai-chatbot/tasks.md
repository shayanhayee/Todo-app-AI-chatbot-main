# Tasks: AI Chatbot Implementation (Phase-III)

## 🏗️ Phase 1: Infrastructure
- [ ] Add `Conversation` and `Message` models to `backend/app/models.py`.
- [ ] Execute database migration (Alembic or `init_db.py`).
- [ ] Create `backend/app/agents/` and `backend/app/mcp/` directories.

## 🛠️ Phase 2: MCP Tooling
- [ ] Implement `TodoMCPServer` in `backend/app/mcp/server.py`.
- [ ] Create tool wrappers in `backend/app/mcp/tools.py` for:
    - `add_task`
    - `list_tasks`
    - `update_task`
    - `delete_task`
    - `complete_task`

## 🧠 Phase 3: AI Logic
- [ ] Implementation of Orchestrator Agent in `backend/app/agents/orchestrator.py`.
- [ ] Implementation of Tool Executor Agent in `backend/app/agents/tool_executor.py`.
- [ ] Create `ChatService` in `backend/app/services/chat_service.py` to handle the chat loop.

## 🌐 Phase 4: API & Frontend
- [ ] Implement `POST /api/chat` in `backend/app/routes/chat.py`.
- [ ] Add floating chat button and drawer to Next.js frontend.
- [ ] Connect frontend to `/api/chat` using a streaming (or standard) fetch.

## ✅ Phase 5: Verification
- [ ] Test natural language task creation.
- [ ] Test task status toggling via chat.
- [ ] Verify message persistence in the database.
