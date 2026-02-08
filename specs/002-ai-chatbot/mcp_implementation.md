# Phase 2: MCP Tool Implementation

We will implement the MCP server and tool wrappers in `backend/app/mcp/`.

## 1. `backend/app/mcp/tools.py`
This file will contain functions that the LLM can call. These functions will internally call the existing logic from `app/routes/tasks.py` or directly interact with the database using the same logic.

## 2. `backend/app/mcp/server.py`
This will initialize the MCP server and register the tools.
