# Quickstart: AI Chatbot Layer

This guide explains how to run the application with the new AI layer enabled.

## Prerequisites
- Python 3.11+
- Node.js 20+
- Google Gemini API Key

## 1. Backend Setup

1. **Environment**: Add your Gemini API key to `backend/.env`.
   ```env
   GEMINI_API_KEY=your-gemini-api-key-here
   ```

2. **Database**: Run the migration script to add the Chat tables.
   ```bash
   cd backend
   python init_db.py 
   ```

3. **Dependencies**: Install the AI specific packages.
   ```bash
   pip install google-generativeai mcp sqlmodel
   ```

4. **Run Server**:
   ```bash
   uvicorn app.main:app --reload
   ```

## 2. Frontend Setup

1. **Start Dev Server**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Access Chat**: Use the floating blue icon in the bottom-right corner to open the AI Todo Assistant.

## 3. Example Queries to Try
- "Add a task to prepare for the demo tomorrow"
- "What do I have to do today?"
- "Set task #1 to high priority"
