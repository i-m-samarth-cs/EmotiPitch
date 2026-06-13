"""
IBM Granite LLM Client for EmotiPitch
Handles all interactions with watsonx.ai Granite-3.0-8B-Instruct model
"""

import os
from typing import Dict, Optional
from ibm_watsonx_ai.foundation_models import Model
from ibm_watsonx_ai.metanames import GenTextParamsMetaNames as GenParams
from dotenv import load_dotenv

load_dotenv()


class GraniteClient:
    """Client for IBM Granite LLM via watsonx.ai"""
    
    def __init__(self):
        self.api_key = os.getenv('WATSONX_API_KEY')
        self.project_id = os.getenv('WATSONX_PROJECT_ID')
        self.url = os.getenv('WATSONX_URL', 'https://us-south.ml.cloud.ibm.com')
        
        if not self.api_key or not self.project_id:
            print("WARNING: watsonx.ai credentials not found. Using mock mode.")
            self.mock_mode = True
        else:
            self.mock_mode = False
            self._initialize_model()
    
    def _initialize_model(self):
        """Initialize the Granite model"""
        try:
            self.model = Model(
                model_id="ibm/granite-3-8b-instruct",
                params={
                    GenParams.DECODING_METHOD: "greedy",
                    GenParams.MAX_NEW_TOKENS: 200,
                    GenParams.MIN_NEW_TOKENS: 50,
                    GenParams.TEMPERATURE: 0.7,
                    GenParams.TOP_K: 50,
                    GenParams.TOP_P: 0.9,
                    GenParams.REPETITION_PENALTY: 1.1
                },
                credentials={
                    "apikey": self.api_key,
                    "url": self.url
                },
                project_id=self.project_id
            )
            print("✅ Granite model initialized successfully")
        except Exception as e:
            print(f"❌ Error initializing Granite model: {e}")
            self.mock_mode = True
    
    def generate_explanation(
        self, 
        emotion: str, 
        match_event: str, 
        timestamp: int
    ) -> Dict:
        """
        Generate emotion-adaptive tactical explanation
        
        Args:
            emotion: User's current emotion (angry, excited, confused, neutral)
            match_event: Description of the match event
            timestamp: Video timestamp in seconds
            
        Returns:
            Dict with explanation, tactical_impact, and confidence
        """
        
        prompt = self._build_explanation_prompt(emotion, match_event, timestamp)
        
        if self.mock_mode:
            return self._generate_mock_explanation(emotion, match_event)
        
        try:
            response = self.model.generate_text(prompt=prompt)
            return self._parse_explanation_response(response, emotion)
        except Exception as e:
            print(f"Error generating explanation: {e}")
            return self._generate_mock_explanation(emotion, match_event)
    
    def _build_explanation_prompt(
        self, 
        emotion: str, 
        match_event: str, 
        timestamp: int
    ) -> str:
        """Build the prompt for explanation generation"""
        
        emotion_styles = {
            'angry': "I saw you were upset. Here's why this decision was made...",
            'confused': "Let me break this down simply for you...",
            'excited': "That was amazing! Here's the tactical brilliance behind it...",
            'neutral': "Let me explain what happened here..."
        }
        
        opening = emotion_styles.get(emotion, emotion_styles['neutral'])
        
        prompt = f"""You are EmotiPitch, an empathetic football tactical explainer for the June Innovation Challenge.

User's emotion: {emotion}
Match event: {match_event}
Timestamp: {timestamp} seconds

Generate an explanation in this style:
Opening: {opening}

Your response must include:
1. Empathetic opening (1 sentence matching the {emotion} emotion)
2. Tactical explanation (2-3 sentences with specific formations, player positions, or referee decisions)
3. Momentum impact (1 sentence on how this changed the game flow)
4. Visual metaphor (1 sentence comparing to something relatable, like "It's like replacing your goalkeeper with a striker")

Keep total response under 80 words. Be warm and conversational, not robotic.

Response:"""
        
        return prompt
    
    def generate_simulation(
        self,
        situation: str,
        user_choice: str,
        emotion: str,
        timestamp: int
    ) -> Dict:
        """
        Generate tactical simulation outcome
        
        Args:
            situation: The tactical situation description
            user_choice: The user's tactical choice
            emotion: User's current emotion
            timestamp: Video timestamp
            
        Returns:
            Dict with outcome, reason, realCoach, confidence, success, emoji
        """
        
        prompt = self._build_simulation_prompt(situation, user_choice, emotion)
        
        if self.mock_mode:
            return self._generate_mock_simulation(user_choice)
        
        try:
            response = self.model.generate_text(prompt=prompt)
            return self._parse_simulation_response(response, user_choice)
        except Exception as e:
            print(f"Error generating simulation: {e}")
            return self._generate_mock_simulation(user_choice)
    
    def _build_simulation_prompt(
        self,
        situation: str,
        user_choice: str,
        emotion: str
    ) -> str:
        """Build the prompt for simulation generation"""
        
        prompt = f"""You are a football tactical simulator for EmotiPitch.

Current situation: {situation}
User's tactical choice: {user_choice}
User's emotion: {emotion}

Generate a realistic simulation outcome with:
1. Immediate outcome (1 sentence: what happens in the next 3-5 minutes)
2. Tactical reason (2 sentences explaining WHY this outcome occurred based on formations and player positioning)
3. Real coach comparison (1 sentence: what the actual coach chose and the result)
4. Confidence score (0-100% based on tactical soundness)

Be dramatic but factual. Keep under 70 words total.

Response format:
OUTCOME: [what happens]
REASON: [tactical explanation]
REAL_COACH: [what real coach did]
CONFIDENCE: [number 0-100]

Response:"""
        
        return prompt
    
    def _parse_explanation_response(self, response: str, emotion: str) -> Dict:
        """Parse the LLM response into structured explanation"""
        
        # Simple parsing - in production, use more robust parsing
        return {
            'explanation': response.strip(),
            'tactical_impact': "This decision shifted the game's momentum and tactical approach.",
            'confidence': 85
        }
    
    def _parse_simulation_response(self, response: str, user_choice: str) -> Dict:
        """Parse the LLM response into structured simulation result"""
        
        # Simple parsing - extract key information
        lines = response.strip().split('\n')
        outcome = ""
        reason = ""
        real_coach = ""
        confidence = 75
        
        for line in lines:
            if line.startswith('OUTCOME:'):
                outcome = line.replace('OUTCOME:', '').strip()
            elif line.startswith('REASON:'):
                reason = line.replace('REASON:', '').strip()
            elif line.startswith('REAL_COACH:'):
                real_coach = line.replace('REAL_COACH:', '').strip()
            elif line.startswith('CONFIDENCE:'):
                try:
                    confidence = int(line.replace('CONFIDENCE:', '').strip())
                except:
                    confidence = 75
        
        # Determine success based on confidence
        success = confidence >= 80
        emoji = '✅' if success else '🛑'
        
        return {
            'outcome': outcome or "Tactical decision executed",
            'reason': reason or "The formation change affected team dynamics.",
            'realCoach': real_coach or "The real coach made a different choice.",
            'confidence': confidence,
            'success': success,
            'emoji': emoji
        }
    
    def _generate_mock_explanation(self, emotion: str, match_event: str) -> Dict:
        """Generate mock explanation when API is unavailable"""
        
        explanations = {
            'angry': {
                'explanation': f"I noticed you were upset about this decision. {match_event}. The referee judged that the player left his leg in to simulate contact. VAR reviewed the incident and found no clear and obvious error - the on-field decision stood. This is frustrating because from one angle it looks like contact, but the referee had the best view and saw the simulation attempt.",
                'tactical_impact': "This decision shifted momentum. The attacking team had to reorganize without the penalty advantage, forcing them to commit more players forward and leaving gaps in defense.",
                'confidence': 87
            },
            'confused': {
                'explanation': f"Let me break this down simply. {match_event}. The VAR system checks for 'clear and obvious errors' - not just any contact. The referee saw the incident live and made a judgment call. VAR reviewed multiple angles but couldn't find definitive evidence to overturn it.",
                'tactical_impact': "The defending team maintained their shape after this decision, keeping their formation compact and forcing the opposition to play wider.",
                'confidence': 82
            },
            'excited': {
                'explanation': f"That was an incredible moment! {match_event}. The tactical brilliance here is in how the team exploited the space. Notice how the midfield created a numerical advantage by pulling defenders out of position. The timing of the run, the weight of the pass, and the clinical finish all came together beautifully.",
                'tactical_impact': "This moment forced the opposition to push higher up the pitch, creating more space for counter-attacks. The momentum shift was palpable.",
                'confidence': 91
            },
            'neutral': {
                'explanation': f"{match_event}. This is a textbook example of modern refereeing with VAR support. The referee made the initial call based on what they saw in real-time. VAR then reviewed the incident from multiple angles to check for any clear errors.",
                'tactical_impact': "Both teams adjusted their tactics after this moment. The defending team maintained their disciplined shape, while the attacking team had to find alternative routes to goal.",
                'confidence': 85
            }
        }
        
        return explanations.get(emotion, explanations['neutral'])
    
    def _generate_mock_simulation(self, user_choice: str) -> Dict:
        """Generate mock simulation when API is unavailable"""
        
        # Simple logic based on choice keywords
        if 'defensive' in user_choice.lower() or 'midfielder' in user_choice.lower():
            return {
                'outcome': "Tactical masterclass! Defense holds strong ✅",
                'reason': "The defensive midfielder provided crucial cover, breaking up attacks and allowing the team to maintain shape. The team absorbed pressure and created counter-attacking opportunities.",
                'realCoach': "The real coach made the same decision! This tactical adjustment was key to controlling the midfield battle.",
                'confidence': 91,
                'success': True,
                'emoji': '✅'
            }
        elif 'formation' in user_choice.lower() or 'switch' in user_choice.lower():
            return {
                'outcome': "Risky move - opposition scores in 4 minutes ⚠️",
                'reason': "The formation switch created numerical superiority in one area but left gaps in defense. The opposition exploited the space with a quick counter-attack.",
                'realCoach': "The real coach chose a more conservative approach with a defensive substitution, which proved more effective.",
                'confidence': 68,
                'success': False,
                'emoji': '🛑'
            }
        else:
            return {
                'outcome': "Moderate success - situation stabilized 🎯",
                'reason': "The tactical decision helped maintain team structure without taking excessive risks. The team managed to control the game tempo.",
                'realCoach': "The real coach made a similar decision, showing good tactical awareness.",
                'confidence': 78,
                'success': True,
                'emoji': '✅'
            }


# Singleton instance
granite_client = GraniteClient()

# Made with Bob
