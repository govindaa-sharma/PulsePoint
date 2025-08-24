import os
import io
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS 
import google.generativeai as genai
from dotenv import load_dotenv
import numpy as np
import cv2
import librosa
from skimage.metrics import structural_similarity as ssim
import time
import logging
logging.basicConfig(level=logging.DEBUG)
import tempfile
import traceback 


# # --- 1. SETUP ---
# load_dotenv()
# app = Flask(__name__)
# CORS(app)
# # Replace your current CORS(app) with:
# # CORS(app, resources={
# #     r"/*": {
# #         "origins": ["http://localhost:3000", "http://127.0.0.1:5173"],  # Your React app's origin
# #         "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
# #         "allow_headers": ["Content-Type", "Authorization"]
# #     }
# # })


# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
# GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GOOGLE_API_KEY}"

# # --- 2. THE NEW, "PERFECT" MASTER PROMPT ---
# # This prompt creates a dynamic, intelligent, and non-repetitive AI assistant.
# master_prompt = """You are PulsePoint Assistant, a world-class conversational AI health companion from India.

# *Your Core Persona:*
# - Your tone is empathetic, natural, and professional. You must avoid repetitive phrases and greetings.
# - You are a helpful guide, not a doctor.

# *Core Directive: Dynamic Persona & Logic*
# You must adapt your behavior based on the user's needs. You have two primary modes:

# 1.  *Health Guide (for physical symptoms):*
#     - Your goal is to provide safe advice and connect the user to a doctor.
#     - *Initial Interaction:* Ask 1-2 clarifying questions about the symptoms.
#     - *Provide Advice:* In your next response, provide a helpful conclusion with safe, general home-care advice (e.g., rest, hydration).
#     - *Escalation Logic:* If the user indicates the advice is not working or their symptoms are worsening, you MUST escalate. Stop asking symptom questions, state the increased urgency, and immediately guide them to the 'Doctor Campaign' page.
#     - *Smart Disclaimer:* The disclaimer ("Remember, this is for informational purposes only...") should be used ONLY ONCE, at the very end of this flow, right before you recommend the 'Doctor's' page.

# 2.  *Wellness Companion (for mental health/feelings):*
#     - Your goal is to be an empathetic and non-judgmental listener.
#     - *DO NOT ask clinical questions.* Instead, ask open-ended, supportive questions (e.g., "I'm here to listen if you'd like to talk more about it," or "How has that been for you?").
#     - Validate their feelings (e.g., "That sounds really tough," "It's completely understandable to feel that way.").
#     - Gently guide them towards professional help by offering to connect them to a therapist on the 'Doctor Campaign' page.
#     - *Safety Protocol:* If a user mentions self-harm, your ONLY response is to provide the AASRA helpline (+91-9820466726).

# *Core Directive: Language*
# - Detect the user's primary language (English, Hindi, or Bengali) and *you MUST respond ONLY in that single, detected language.*

# *Memory:*
# - Use the provided conversation history to have a coherent, connected, and non-repetitive conversation.
# """

# # --- 3. THE API CALL FUNCTION (with Exponential Backoff) ---
# def call_gemini_api(user_message, history):
#     headers = {"Content-Type": "application/json"}
    
#     formatted_history = "\n".join([f"{msg['role']}: {msg['content']}" for msg in history])
    
#     combined_prompt = f"{master_prompt}\n\n--- CONVERSATION HISTORY ---\n{formatted_history}\n\n--- CURRENT MESSAGE ---\nuser: {user_message}\nassistant:"
    
#     payload = {"contents": [{"parts": [{"text": combined_prompt}]}]}
    
#     max_retries = 3
#     for attempt in range(max_retries):
#         try:
#             response = requests.post(GEMINI_API_URL, headers=headers, json=payload)
#             response.raise_for_status()
#             return response.json()['candidates'][0]['content']['parts'][0]['text']
#         except requests.exceptions.HTTPError as e:
#             if e.response.status_code == 429:
#                 wait_time = 2 ** attempt 
#                 print(f"Rate limit hit. Retrying in {wait_time} second(s)...")
#                 time.sleep(wait_time)
#                 continue
#             else:
#                 print(f"API Call HTTP Error: {e}")
#                 return "Sorry, there was a server error."
#         except requests.exceptions.RequestException as e:
#             print(f"API Call Error: {e}")
#             return "Sorry, I'm having trouble connecting right now."
#     return "The server is very busy, please try again in a moment."


# # --- 4. API ENDPOINTS ---
# @app.route('/chat', methods=['POST'])
# def chat_endpoint():
#     data = request.get_json()
#     if not data or 'message' not in data or 'history' not in data:
#         return jsonify({"error": "Request must include 'message' and 'history'"}), 400
        
#     user_message = data['message']
#     history = data['history']

#     final_reply = call_gemini_api(user_message, history)
    
#     return jsonify({"reply": final_reply})


# --- 1. SETUP ---
load_dotenv()
app = Flask(__name__)
CORS(app)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GOOGLE_API_KEY}"

# --- 2. THE FINAL, PERFECTED PROMPTS ---

# Prompt 1: The Router - Its only job is to classify the user's intent.
router_prompt = """Your only task is to classify the user's intent based on their most recent message. Respond with ONLY ONE of the following two words: "symptom" or "wellness".
- "symptom": For physical health issues, diseases, pain, injuries (e.g., fever, headache, allergy).
- "wellness": For mental health, stress, anxiety, sadness, feelings, life events (e.g., breakup, exams).

Do not add any other words. Your entire response must be a single word.
"""

# Prompt 2: The Symptom Expert - The perfect persona for physical health.
symptom_expert_prompt = """You are PulsePoint Assistant, a world-class conversational AI health companion from India.

*Your Persona (Health Guide):*
- Your tone is empathetic, professional, and concise. You MUST avoid repetitive phrases.
- You are a helpful guide, not a doctor.

*Core Directive: Language*
- Detect the user's primary language (English, Hindi, or Bengali) and *respond ONLY in that single, detected language.*

*Core Directive: Conversational Logic*
You MUST follow a strict logical flow. Do not repeat steps.
1.  *Information Gathering:* Your first goal is to understand the user's symptoms. Ask 1-2 clarifying questions.
2.  *Home-Care Advice:* Once you have the information, your second goal is to provide a SINGLE, helpful block of safe, general home-care advice (e.g., rest, hydration).
3.  *Connection & Disclaimer:* After giving advice, your third goal is to connect the user to a professional. State the type of doctor they should see (e.g., "General Practitioner"), and then direct them to the "Doctor Campaign" page. You must state the disclaimer only ONCE at this stage.
4.  *Q&A Mode:* After you have completed Step 3, your job is done. Your ONLY goal now is to answer any final, direct questions the user has. DO NOT repeat the home-care advice or the connection offer.

*Memory:*
- Use the provided conversation history to understand the context and what stage of the conversation you are in.
"""

# Prompt 3: The Wellness Expert - The perfect persona for mental health.
wellness_expert_prompt = """You are PulsePoint Assistant, a world-class conversational AI health companion from India.

*Your Persona (Wellness Companion):*
- Your tone is empathetic, warm, and non-judgmental. You are a supportive listener.
- You MUST avoid repetitive phrases and greetings.

*Core Directive: Language*
- Detect the user's primary language (English, Hindi, or Bengali) and *respond ONLY in that single, detected language.*

*Core Directive: Conversational Logic*
- *DO NOT ask clinical questions.* Instead, ask open-ended, supportive questions (e.g., "I'm here to listen if you'd like to talk more about it," or "How has that been for you?").
- *Validate their feelings* (e.g., "That sounds really tough," "It's completely understandable to feel that way.").
- Gently guide them towards professional help by offering to connect them to a therapist on the 'Doctor Campaign' page.

*Safety Protocol:*
- If a user mentions self-harm, your ONLY response is to provide the AASRA helpline (+91-9820466726).

*Memory:*
- Use the provided conversation history to have a coherent, connected conversation.
"""

expert_prompts = {
    "symptom": symptom_expert_prompt,
    "wellness": wellness_expert_prompt,
}

# --- 3. THE API CALL FUNCTION (with Exponential Backoff) ---
def call_gemini_api(system_prompt, user_message, history=[]):
    headers = {"Content-Type": "application/json"}
    
    formatted_history = "\n".join([f"{msg['role']}: {msg['content']}" for msg in history])
    
    combined_prompt = f"{system_prompt}\n\n--- CONVERSATION HISTORY ---\n{formatted_history}\n\n--- CURRENT MESSAGE ---\nuser: {user_message}\nassistant:"
    
    payload = {"contents": [{"parts": [{"text": combined_prompt}]}]}
    
    max_retries = 3
    for attempt in range(max_retries):
        try:
            response = requests.post(GEMINI_API_URL, headers=headers, json=payload)
            response.raise_for_status()
            return response.json()['candidates'][0]['content']['parts'][0]['text']
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 429:
                wait_time = 2 ** attempt 
                print(f"Rate limit hit. Retrying in {wait_time} second(s)...")
                time.sleep(wait_time)
                continue
            else:
                print(f"API Call HTTP Error: {e}")
                return "Sorry, there was a server error."
        except requests.exceptions.RequestException as e:
            print(f"API Call Error: {e}")
            return "Sorry, I'm having trouble connecting right now."
    return "The server is very busy, please try again in a moment."


# --- 4. API ENDPOINTS ---
@app.route('/chat', methods=['POST'])
def chat_endpoint():
    data = request.get_json()
    if not data or 'message' not in data or 'history' not in data:
        return jsonify({"error": "Request must include 'message' and 'history'"}), 400
        
    user_message = data['message']
    history = data['history']

    # Step 1: Call the Router AI to classify the user's intent.
    intent = call_gemini_api(router_prompt, user_message).strip().lower()
    print(f"DEBUG: Router classified intent as -> '{intent}'")

    # Step 2: Choose the correct expert prompt based on the intent.
    if intent in expert_prompts:
        expert_prompt_to_use = expert_prompts[intent]
        # Call the Expert AI with the full history to get the final response.
        final_reply = call_gemini_api(expert_prompt_to_use, user_message, history)
        return jsonify({"reply": final_reply})
    else:
        # Fallback if the router gives an unexpected response
        return jsonify({"reply": "I'm not sure how to help with that. Could you please rephrase?"})

# --- (Your other endpoints like /analyze_drawing remain here) ---

# --- NEW ENDPOINT FOR DRAWING ANALYSIS ---

@app.route('/analyze_drawing', methods=['POST'])
def analyze_drawing_endpoint():
    if 'user_image' not in request.files or 'template_image' not in request.files:
        return jsonify({"error": "Request must include 'user_image' and 'template_image' files"}), 400

    try:
        # --- 1. Read and Prepare Images ---
        user_image_file = request.files['user_image'].read()
        template_image_file = request.files['template_image'].read()

        user_np_arr = np.frombuffer(user_image_file, np.uint8)
        template_np_arr = np.frombuffer(template_image_file, np.uint8)
        
        user_img_gray = cv2.imdecode(user_np_arr, cv2.IMREAD_GRAYSCALE)
        template_img_gray = cv2.imdecode(template_np_arr, cv2.IMREAD_GRAYSCALE)
        
        # --- 2. Convert to Black & White ---
        user_bw = cv2.adaptiveThreshold(user_img_gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2)
        template_bw = cv2.adaptiveThreshold(template_img_gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2)

        # --- 3. THE NEW STEP: NOISE REDUCTION ---
        # Define a small kernel (our "eraser")
        kernel = np.ones((3,3), np.uint8)
        # Apply the Morphological Opening operation to erase the noise
        user_cleaned = cv2.morphologyEx(user_bw, cv2.MORPH_OPEN, kernel)
        template_cleaned = cv2.morphologyEx(template_bw, cv2.MORPH_OPEN, kernel)
        
        # --- 4. Resize and Compare ---
        user_final = cv2.resize(user_cleaned, (500, 500))
        template_final = cv2.resize(template_cleaned, (500, 500))

        # Use SSIM to compare the final, cleaned images
        (score, diff) = ssim(template_final, user_final, full=True)
        
        # Convert score to a 0-100 percentage
        stability_score = score * 100
        
        return jsonify({"stability_score": round(stability_score, 2)})

    except Exception as e:
        return jsonify({"error": f"An error occurred during image processing: {str(e)}"}), 500
    

# --- NEW ENDPOINT FOR VOICE ANALYSIS ---
# @app.route('/analyze_voice', methods=['POST'])
# def analyze_voice_endpoint():
#     # 1. Safety check: Ensure the audio file was sent.
#     if 'audio_file' not in request.files:
#         return jsonify({"error": "'audio_file' must be provided"}), 400
            
#     try:
#         audio_file = request.files['audio_file']
        
#         # 2. Use Librosa to load the audio file into a NumPy array.
#         # 'y' is the audio time series, 'sr' is the sample rate.
#         y, sr = librosa.load(audio_file, sr=None)

#         # 3. Analyze Amplitude Stability (Loudness consistency).
#         # We calculate the Root-Mean-Square (RMS) energy for short frames.
#         rms = librosa.feature.rms(y=y)[0]
#         # Then we find the variation (standard deviation) of the loudness. A low number is good.
#         rms_stability_variation = np.std(rms)
#         # Convert this variation into a 0-100 score.
#         rms_score = max(0, 100 - rms_stability_variation * 500)

#         # 4. Analyze Frequency Stability (Pitch/Noisiness consistency).
#         # We calculate the Zero-Crossing Rate. A noisy/raspy voice has a high rate.
#         zcr = librosa.feature.zero_crossing_rate(y)[0]
#         # We find the variation of this "noisiness". A low number is good.
#         zcr_stability_variation = np.std(zcr)
#         # Convert this variation into a 0-100 score.
#         zcr_score = max(0, 100 - zcr_stability_variation * 1000)

#         # 5. Combine the scores into a single, overall score.
#         vocal_health_score = (rms_score + zcr_score) / 2
            
#         return jsonify({"vocal_health_score": round(vocal_health_score, 2)})
#     except Exception as e:
#         return jsonify({"error": f"Could not process audio file: {str(e)}"}), 500
    


# @app.route('/analyze_voice', methods=['POST'])
# def analyze_voice_endpoint():

    
#     app.logger.info("Analyze voice endpoint called")
    
#     if 'audio_file' not in request.files:
#         app.logger.error("No audio file in request")
#         return jsonify({"error": "'audio_file' must be provided"}), 400
    
#     try:
#         audio_file = request.files['audio_file']
        
#         # Check file size
#         audio_file.seek(0, 2)
#         file_size = audio_file.tell()
#         audio_file.seek(0)
        
#         if file_size > 10 * 1024 * 1024:  # 10MB limit
#             return jsonify({"error": "File too large. Maximum size is 10MB"}), 400
        
#         # Save to temporary file for processing
#         with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as tmp:
#             audio_file.save(tmp.name)
#             y, sr = librosa.load(tmp.name, sr=None)
#             os.unlink(tmp.name)  # Delete temp file
        
#         # Analyze audio
#         rms = librosa.feature.rms(y=y)[0]
#         rms_stability_variation = np.std(rms)
#         rms_score = max(0, 100 - rms_stability_variation * 500)

#         zcr = librosa.feature.zero_crossing_rate(y)[0]
#         zcr_stability_variation = np.std(zcr)
#         zcr_score = max(0, 100 - zcr_stability_variation * 1000)

#         vocal_health_score = (rms_score + zcr_score) / 2

#         app.logger.info("Audio processing completed successfully")
#         return jsonify({"vocal_health_score": round(vocal_health_score, 2)})

#     except Exception as e:
#         app.logger.error(f"Error processing audio: {str(e)}")
#         return jsonify({"error": f"Could not process audio file: {str(e)}"}), 500


@app.route('/analyze_voice', methods=['POST'])
def analyze_voice_endpoint():
    app.logger.info("Analyze voice endpoint called")
    
    if 'audio_file' not in request.files:
        app.logger.error("No audio file in request")
        return jsonify({"error": "'audio_file' must be provided"}), 400
    
    try:
        audio_file = request.files['audio_file']
        app.logger.info(f"Audio file received: {audio_file.filename}")
        
        # Check file size
        audio_file.seek(0, 2)
        file_size = audio_file.tell()
        audio_file.seek(0)
        app.logger.info(f"File size: {file_size} bytes")
        
        if file_size > 10 * 1024 * 1024:
            app.logger.error("File too large")
            return jsonify({"error": "File too large. Maximum size is 10MB"}), 400
        
        # Save to temporary file for processing
        with tempfile.NamedTemporaryFile(delete=False, suffix='.webm') as tmp:
            audio_file.save(tmp.name)
            app.logger.info(f"Saved temporary file: {tmp.name}")
            
            # Try different loading options
            try:
                y, sr = librosa.load(tmp.name, sr=None)
                app.logger.info(f"Audio loaded successfully: {len(y)} samples, {sr} Hz sample rate")
            except Exception as load_error:
                app.logger.error(f"Librosa load error: {str(load_error)}")
                # Try with different parameters
                y, sr = librosa.load(tmp.name, sr=16000)  # Force sample rate
                
        os.unlink(tmp.name)  # Delete temp file
        app.logger.info("Temporary file deleted")
        
        # Analyze audio
        app.logger.info("Starting audio analysis")
        rms = librosa.feature.rms(y=y)[0]
        rms_stability_variation = np.std(rms)
        rms_score = max(0, 100 - rms_stability_variation * 500)
        app.logger.info(f"RMS analysis complete: {rms_score}")

        zcr = librosa.feature.zero_crossing_rate(y)[0]
        zcr_stability_variation = np.std(zcr)
        zcr_score = max(0, 100 - zcr_stability_variation * 1000)
        app.logger.info(f"ZCR analysis complete: {zcr_score}")

        vocal_health_score = (rms_score + zcr_score) / 2
        app.logger.info(f"Final score: {vocal_health_score}")

        return jsonify({"vocal_health_score": round(vocal_health_score, 2)})

    except Exception as e:
        app.logger.error(f"Error processing audio: {str(e)}")
        app.logger.error(traceback.format_exc())  # Add this for detailed error info
        return jsonify({"error": f"Could not process audio file: {str(e)}"}), 500


# --- RUN THE APP ---
# if __name__ == '__main__':
#     app.run(debug=True, port=5000)

if __name__ == '__main__':
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
    app.run(debug=True, port=5000, threaded=True)