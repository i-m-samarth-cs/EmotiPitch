"""
EmotiPitch Flask Backend
Main application file for the emotion-driven tactical mirror
"""

from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Import route blueprints
from routes.explain import explain_bp
from routes.simulate import simulate_bp

# Initialize Flask app
app = Flask(__name__)

# Configure CORS
cors_origins = os.getenv('CORS_ORIGINS', 'http://localhost:5173').split(',')
CORS(app, resources={
    r"/api/*": {
        "origins": cors_origins,
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Register blueprints with /api prefix
app.register_blueprint(explain_bp, url_prefix='/api')
app.register_blueprint(simulate_bp, url_prefix='/api')


@app.route('/')
def index():
    """Root endpoint - API information"""
    return jsonify({
        'name': 'EmotiPitch API',
        'version': '1.0.0',
        'description': 'Emotion-driven tactical mirror for football matches',
        'challenge': 'June Innovation Challenge - Soccer + AI + World Cup',
        'endpoints': {
            '/api/explain': 'Generate emotion-adaptive tactical explanations',
            '/api/simulate': 'Generate tactical simulation outcomes',
            '/api/health': 'Health check for all services'
        },
        'powered_by': [
            'IBM Granite LLM (watsonx.ai)',
            'Flask',
            'LangFlow'
        ]
    }), 200


@app.route('/api/health')
def health():
    """Health check endpoint for the entire API"""
    from utils.granite_client import granite_client
    
    return jsonify({
        'status': 'healthy',
        'api_version': '1.0.0',
        'services': {
            'explanation': 'operational',
            'simulation': 'operational',
            'granite_llm': 'operational' if not granite_client.mock_mode else 'mock_mode'
        },
        'granite_mode': 'production' if not granite_client.mock_mode else 'mock'
    }), 200


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'error': 'Endpoint not found',
        'message': 'The requested endpoint does not exist'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({
        'error': 'Internal server error',
        'message': 'An unexpected error occurred'
    }), 500


if __name__ == '__main__':
    from utils.granite_client import granite_client
    
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    
    print("=" * 60)
    print("🚀 EmotiPitch Backend Starting...")
    print("=" * 60)
    print(f"📍 Running on: http://localhost:{port}")
    print(f"🔧 Debug mode: {debug}")
    print(f"🤖 IBM Granite LLM: {'Connected' if not granite_client.mock_mode else 'Mock Mode'}")
    print("=" * 60)
    print("\n✅ Server ready! Waiting for requests...\n")
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )

# Made with Bob
