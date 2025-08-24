import os
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS 
from dotenv import load_dotenv
import json

# --- SETUP ---
load_dotenv()
app = Flask(__name__)
CORS(app)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    print("WARNING: GOOGLE_API_KEY not found in environment variables")

# --- SIMPLE CHAT ENDPOINT FOR TESTING ---
@app.route('/chat', methods=['POST', 'GET'])  # Allow both POST and GET for testing
def chat_endpoint():
    if request.method == 'GET':
        return jsonify({"message": "Chat endpoint is working. Use POST to send messages."})
    
    # Check if request contains JSON
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    
    data = request.get_json()
    
    # Validate required fields
    if not data or 'message' not in data:
        return jsonify({"error": "Missing 'message' in request body"}), 400
    
    user_message = data['message']
    history = data.get('history', [])
    
    # Simple response for testing
    response = f"Received your message: '{user_message}'. History length: {len(history)}"
    
    return jsonify({"reply": response})

# --- HEALTH CHECK ENDPOINT ---
@app.route('/')
def health_check():
    return "Flask server is running!"

# --- RUN THE APP ---
if __name__ == '__main__':
    print("Starting Flask server...")
    print("Available endpoints:")
    print("  GET  / - Health check")
    print("  POST /chat - Chat endpoint")
    app.run(debug=True, port=5000, host='0.0.0.0')