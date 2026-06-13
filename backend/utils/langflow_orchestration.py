"""
LangFlow Orchestration for EmotiPitch
Manages the emotion → LLM → explanation pipeline
"""

import os
import json
from typing import Dict, Optional
import requests
from dotenv import load_dotenv

load_dotenv()


class LangFlowOrchestrator:
    """Orchestrates LangFlow flows for EmotiPitch"""
    
    def __init__(self):
        self.langflow_url = os.getenv('LANGFLOW_URL', 'http://localhost:7860')
        self.api_key = os.getenv('LANGFLOW_API_KEY', '')
        self.flow_id = None
        
    def execute_explanation_flow(
        self,
        emotion: str,
        match_event: str,
        timestamp: int
    ) -> Dict:
        """
        Execute the explanation flow through LangFlow
        
        Args:
            emotion: User's emotion
            match_event: Match event description
            timestamp: Video timestamp
            
        Returns:
            Dict with explanation result
        """
        
        # Prepare input data for LangFlow
        input_data = {
            "emotion": emotion,
            "match_event": match_event,
            "timestamp": timestamp
        }
        
        try:
            # Call LangFlow API
            response = requests.post(
                f"{self.langflow_url}/api/v1/run/{self.flow_id}",
                json={"inputs": input_data},
                headers={"Authorization": f"Bearer {self.api_key}"} if self.api_key else {},
                timeout=30
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                print(f"LangFlow error: {response.status_code}")
                return None
                
        except Exception as e:
            print(f"Error executing LangFlow: {e}")
            return None
    
    def load_flow_from_file(self, flow_path: str) -> bool:
        """
        Load a LangFlow flow from JSON file
        
        Args:
            flow_path: Path to the flow JSON file
            
        Returns:
            True if successful, False otherwise
        """
        try:
            with open(flow_path, 'r') as f:
                flow_data = json.load(f)
                self.flow_id = flow_data.get('id')
                return True
        except Exception as e:
            print(f"Error loading flow: {e}")
            return False


# Singleton instance
langflow_orchestrator = LangFlowOrchestrator()

# Made with Bob
