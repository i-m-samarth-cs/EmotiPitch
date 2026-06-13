"""
Simulation endpoint for EmotiPitch
Generates tactical simulation outcomes using IBM Granite LLM
"""

from flask import Blueprint, request, jsonify
from utils.granite_client import granite_client

simulate_bp = Blueprint('simulate', __name__)


@simulate_bp.route('/simulate', methods=['POST'])
def generate_simulation():
    """
    Generate tactical simulation outcome based on user's choice
    
    Request body:
    {
        "situation": "Argentina is pressing high...",
        "user_choice": "Switch to 3-5-2 formation",
        "emotion": "angry",
        "timestamp": 75
    }
    
    Response:
    {
        "outcome": "Argentina scores in 3 minutes! ⚽",
        "reason": "The formation switch created gaps...",
        "realCoach": "The real coach chose option B...",
        "confidence": 72,
        "success": false,
        "emoji": "🛑"
    }
    """
    
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data:
            print("❌ Error: No data provided in request")
            return jsonify({'error': 'No data provided'}), 400
        
        situation = data.get('situation', 'Tactical decision required')
        user_choice = data.get('user_choice', 'Maintain current formation')
        emotion = data.get('emotion', 'neutral')
        timestamp = data.get('timestamp', 0)
        
        # Log incoming request
        print("\n" + "="*60)
        print("🎯 SIMULATION REQUEST RECEIVED")
        print("="*60)
        print(f"📋 Situation: {situation[:50]}...")
        print(f"✅ User Choice: {user_choice}")
        print(f"🎭 Emotion: {emotion}")
        print(f"⏱️  Timestamp: {timestamp}s")
        print("="*60)
        
        # Validate emotion
        valid_emotions = ['angry', 'excited', 'confused', 'neutral']
        if emotion not in valid_emotions:
            print(f"⚠️  Invalid emotion '{emotion}', defaulting to 'neutral'")
            emotion = 'neutral'
        
        # Generate simulation using Granite LLM
        print("🤖 Simulating tactical outcome with IBM Granite LLM...")
        result = granite_client.generate_simulation(
            situation=situation,
            user_choice=user_choice,
            emotion=emotion,
            timestamp=timestamp
        )
        
        print(f"✅ Simulation complete - {'Success' if result.get('success') else 'Failure'}")
        print(f"📊 Confidence: {result.get('confidence', 0)}%")
        print("="*60 + "\n")
        
        return jsonify(result), 200
        
    except Exception as e:
        print("\n" + "="*60)
        print("❌ ERROR in /simulate endpoint")
        print("="*60)
        print(f"Error: {e}")
        print("="*60 + "\n")
        return jsonify({
            'error': 'Failed to generate simulation',
            'message': str(e)
        }), 500


@simulate_bp.route('/simulate/health', methods=['GET'])
def health_check():
    """Health check endpoint for simulation service"""
    return jsonify({
        'status': 'healthy',
        'service': 'simulation',
        'granite_available': not granite_client.mock_mode
    }), 200

# Made with Bob
