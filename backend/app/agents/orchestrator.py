import os
import json
from typing import List, Dict, Any
import google.generativeai as genai

from app.agents.prompts import ORCHESTRATOR_SYSTEM_PROMPT, TOOL_EXECUTOR_SYSTEM_PROMPT
from app.mcp.server import TodoMCPServer
from app.models import MessageRole

class AgentOrchestrator:
    def __init__(self, session, user_id):
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = genai.GenerativeModel(
            'gemini-flash-latest',
            tools=self._convert_tools_to_gemini_format()
        )
        self.mcp_server = TodoMCPServer(session, user_id)
        self.user_id = user_id
        self.session = session

    def _convert_tools_to_gemini_format(self):
        """Convert MCP tool definitions to Gemini function calling format."""
        # Gemini expects function declarations
        tools = []
        temp_server = TodoMCPServer(None, None)
        for tool in temp_server.tools:
            tools.append({
                "name": tool["name"],
                "description": tool["description"],
                "parameters": tool["parameters"]
            })
        return tools

    def run_chat(self, history: List[Dict[str, Any]], user_message: str) -> str:
        """
        Runs the agent loop using Google Gemini.
        1. Context: Previous messages + current message.
        2. Thought: Orchestrator decides if tools are needed.
        3. Action: Call MCP tools if necessary.
        4. Observation: Get tool results.
        5. Response: Final output to user.
        """
        # Build chat history for Gemini
        chat = self.model.start_chat(history=[
            {"role": "user" if msg["role"] == "user" else "model", "parts": [msg["content"]]}
            for msg in history
        ])

        # Send user message with system prompt context
        full_prompt = f"{ORCHESTRATOR_SYSTEM_PROMPT}\n\nUser: {user_message}"
        response = chat.send_message(full_prompt)

        # Check if function calls are requested
        if response.candidates[0].content.parts[0].function_call:
            function_call = response.candidates[0].content.parts[0].function_call
            function_name = function_call.name
            function_args = dict(function_call.args)
            
            print(f"[AGENT] Calling tool: {function_name} with {function_args}")
            
            # Execute tool via MCP Server
            tool_output = self.mcp_server.call_tool(function_name, function_args)
            
            # Send function response back to model
            response = chat.send_message({
                "function_response": {
                    "name": function_name,
                    "response": {"result": tool_output}
                }
            })
        
        return response.text
