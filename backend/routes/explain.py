"""
Explanation endpoint for EmotiPitch
Generates emotion-adaptive tactical explanations using IBM Granite LLM
"""

from flask import Blueprint, request, jsonify
from utils.granite_client import granite_client

explain_bp = Blueprint('explain', __name__)


@explain_bp.route('/explain', methods=['POST'])
def generate_explanation():
    """
    Generate emotion-adaptive tactical explanation
    
    Request body:
    {
        "user_emotion": "angry|excited|confused|neutral",
        "video_timestamp": 67,
        "match_event": "Thuram simulation - booked for diving"
    }
    
    Response:
    {
        "explanation": "Empathetic explanation text...",
        "tactical_impact": "How this affected the game...",
        "confidence": 87
    }
    """
    
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data:
            print("❌ Error: No data provided in request")
            return jsonify({'error': 'No data provided'}), 400
        
        user_emotion = data.get('user_emotion', 'neutral')
        video_timestamp = data.get('video_timestamp', 0)
        match_event = data.get('match_event', 'Key tactical moment')
        
        # Log incoming request
        print("\n" + "="*60)
        print("📥 EXPLANATION REQUEST RECEIVED")
        print("="*60)
        print(f"🎭 Emotion: {user_emotion}")
        print(f"⏱️  Timestamp: {video_timestamp}s")
        print(f"⚽ Event: {match_event}")
        print("="*60)
        
        # Validate emotion
        valid_emotions = ['angry', 'excited', 'confused', 'neutral']
        if user_emotion not in valid_emotions:
            print(f"⚠️  Invalid emotion '{user_emotion}', defaulting to 'neutral'")
            user_emotion = 'neutral'
        
        # Generate explanation using Granite LLM
        print("🤖 Generating explanation with IBM Granite LLM...")
        result = granite_client.generate_explanation(
            emotion=user_emotion,
            match_event=match_event,
            timestamp=video_timestamp
        )
        
        print("✅ Explanation generated successfully")
        print(f"📊 Confidence: {result.get('confidence', 0)}%")
        print("="*60 + "\n")
        
        return jsonify(result), 200
        
    except Exception as e:
        print("\n" + "="*60)
        print("❌ ERROR in /explain endpoint")
        print("="*60)
        print(f"Error: {e}")
        print("="*60 + "\n")
        return jsonify({
            'error': 'Failed to generate explanation',
            'message': str(e)
        }), 500


@explain_bp.route('/explain/health', methods=['GET'])
def health_check():
    """Health check endpoint for explanation service"""
    return jsonify({
        'status': 'healthy',
        'service': 'explanation',
        'granite_available': not granite_client.mock_mode
    }), 200

# Made with Bob
