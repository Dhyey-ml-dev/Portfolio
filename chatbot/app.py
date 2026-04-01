#!/usr/bin/env python3
"""
AI Chatbot Backend - Flask
Serves on port 8000
Provides /chat endpoint for portfolio chatbot
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv
import google.generativeai as genai

env_path = Path(__file__).resolve().parents[1] / ".env"
if env_path.exists():
    load_dotenv(env_path)
else:
    load_dotenv()

app = Flask(__name__)
CORS(app)

# Portfolio context - DS TECHVIBE information
PORTFOLIO_CONTEXT = {
    "name": "DS TECHVIBE",
    "role": "Full-Stack & AI Systems Developer",
    "email": "pavagadhidhyey2@gmail.com",
    "skills": [
        "React", "Node.js", "Python", "XGBoost", "Three.js", "Next.js",
        "MongoDB", "PostgreSQL", "JavaScript", "TypeScript", "Tailwind CSS", "Docker"
    ],
    "projects": [
        {
            "name": "CreditCheck AI",
            "description": "CreditCheck AI is a web-based system that predicting if a person is eligible for credit approval using ML with a Django backend. Users enter financial details & Debt-to-Income Ratio. Data is sent to a Random Forest or XGBoost model. It uses explainable AI (SHAP) to show which factors influenced outcomes. Works fast and can be expanded into an industry-level system needing APIs and fraud detection.",
            "tech": ["Python", "Django", "React", "Node.js", "MongoDB", "Scikit-Learn"]
        },
        {
            "name": "Solar System Portfolio",
            "description": "Your Solar System Portfolio is a fully interactive 3D experience exploring work like space travel via Three.js, React and Tailwind CSS. The Sun is the main light source, 8 planets revolve smoothly. Cinematic and immersive with background stars and sounds. Clicking Earth triggers a smooth camera zoom into the main portfolio content. Showcases creative frontend 3D rendering and storytelling.",
            "tech": ["Three.js", "React", "Framer Motion", "Tailwind CSS"]
        },
        {
            "name": "Jarvis Voice Assistant",
            "description": "Jarvis is a fully Python-based intelligent voice assistant converting speech to text to run commands or answer questions in real time. Connects with Gemini/GPT for intelligent responses. Multilingual (English, Hindi, Gujarati). Includes a modern web-based interface with chat display, text-to-speech, and stores interactions in a local database (SQLite) allowing Excel export. Combines voice processing, AI, automation and database.",
            "tech": ["Python", "SpeechRecognition", "PyTTXS3", "OpenAI API", "SQLite"]
        },
        {
            "name": "Shabari Restaurant Web App",
            "description": "The Shabari Restaurant Web App is a complete full-stack project building a digital platform for a restaurant. Clean, user-friendly frontend fetching dynamic menus via APIs. Contains a secure admin panel acting as a control center for full CRUD operations (add/edit food items, categories, prices, images). Changes reflect instantly. Demonstrates strong understanding of full-stack API integration and real-world architectures.",
            "tech": ["React", "Express.js", "MongoDB", "Auth0"]
        }
    ],
    "services": [
        "AI Web Application Design",
        "Full-Stack Development",
        "Data Science & Predictive Modeling",
        "3D Interactive Web Experiences",
        "Business Automation Solutions"
    ]
}


def get_gemini_response(user_message: str):
    """Call Gemini with portfolio context; return None on failure."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-pro")

        context_block = (
            f"You are the AI assistant for {PORTFOLIO_CONTEXT['name']} (Role: {PORTFOLIO_CONTEXT['role']}).\n"
            f"Email: {PORTFOLIO_CONTEXT['email']}. WhatsApp: +91-9265783369.\n"
            "Projects:\n"
            + "\n".join([f"- {p['name']}: {p['description']} (Tech: {', '.join(p['tech'])})" for p in PORTFOLIO_CONTEXT['projects']])
            + "\nServices: " + ", ".join(PORTFOLIO_CONTEXT['services']) + "\n"
            "Answer concisely and helpfully. If asked for pricing/timelines, give high-level guidance and invite details."
        )

        prompt = f"{context_block}\n\nUser: {user_message}\nAssistant:"
        response = model.generate_content(prompt)
        text = (response.text or "").strip()
        return text or None
    except Exception as e:
        print(f"Gemini error: {e}")
        return None

def get_bot_response(user_message):
    """Generate chatbot response based on user message with broad keyword coverage."""
    message_lower = user_message.lower()

    # Fast keyword helpers
    def has(*words):
        return any(word in message_lower for word in words)

    # Greetings / intro
    if has("hello", "hi", "hey", "greetings"):
        return "Hey! 👋 I'm the DS TECHVIBE assistant. Ask me about projects, skills, services, timelines, or how to reach out."

    if has("who", "name", "yourself", "introduce"):
        return f"I'm the AI assistant for {PORTFOLIO_CONTEXT['name']}, a {PORTFOLIO_CONTEXT['role']}. I can summarize projects, skills, services, timelines, and contact options."

    # Project-specific lookups
    if has("solar", "planet", "three.js", "3d", "space"):
        p = PORTFOLIO_CONTEXT['projects'][1]
        return f"{p['name']}: {p['description']} Tech: {', '.join(p['tech'])}."
    if has("credit", "loan", "creditcheck", "finance", "shap"):
        p = PORTFOLIO_CONTEXT['projects'][0]
        return f"{p['name']}: {p['description']} Tech: {', '.join(p['tech'])}."
    if has("jarvis", "voice", "speech", "assistant", "mic", "multilingual"):
        p = PORTFOLIO_CONTEXT['projects'][2]
        return f"{p['name']}: {p['description']} Tech: {', '.join(p['tech'])}."
    if has("shabari", "restaurant", "menu", "crud", "admin"):
        p = PORTFOLIO_CONTEXT['projects'][3]
        return f"{p['name']}: {p['description']} Tech: {', '.join(p['tech'])}."

    # General portfolio queries
    if has("project", "portfolio", "work", "built", "case study"):
        projects_text = "\n".join([f"• {p['name']}: {p['description']}" for p in PORTFOLIO_CONTEXT['projects']])
        return f"📁 Notable Projects:\n{projects_text}"

    if has("skills", "tech", "stack", "expertise", "technologies", "tools"):
        return "🔧 Core stack: " + ", ".join(PORTFOLIO_CONTEXT['skills'])

    if has("service", "offer", "help", "do", "build", "deliver"):
        services_text = "\n".join([f"✓ {s}" for s in PORTFOLIO_CONTEXT['services']])
        return f"🎯 Services:\n{services_text}\nNeed something specific? Tell me your idea and timeline."

    if has("contact", "email", "reach", "hire", "work together", "whatsapp", "phone"):
        return f"📧 Reach {PORTFOLIO_CONTEXT['name']} at {PORTFOLIO_CONTEXT['email']} or the contact form. For WhatsApp, use +91-9265783369."

    if has("price", "pricing", "rate", "cost", "budget"):
        return "Pricing depends on scope and timeline. Share your project details (features, timeline, budget) and I'll outline a phased estimate."

    if has("timeline", "how long", "deadline", "deliver", "duration"):
        return "Typical timelines: small features 1-2 weeks, mid-size apps 3-6 weeks, complex AI/3D builds 6-10+ weeks. Share scope for a tighter estimate."

    if has("availability", "free", "book", "schedule", "start"):
        return "Availability: taking new work now. Share your start date and deadline to lock a slot."

    if has("experience", "years", "senior", "background"):
        return "💼 Experienced in full-stack, AI/ML, and 3D web. Built production-grade apps with real users and explainable ML systems."

    if has("location", "where", "timezone", "remote"):
        return "🌍 Working remotely, comfortable with async and overlapping hours across time zones."

    # Default: helpful summary instead of a dead-end
    projects_short = "; ".join([p['name'] for p in PORTFOLIO_CONTEXT['projects']])
    return (
        "Here's a quick snapshot of DS TECHVIBE: "
        f"Projects — {projects_short}. "
        f"Services — {', '.join(PORTFOLIO_CONTEXT['services'])}. "
        f"Skills — {', '.join(PORTFOLIO_CONTEXT['skills'])}. "
        "Tell me what you're looking for (project idea, timeline, budget, or tech questions) and I'll tailor the answer."
    )

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'chatbot',
        'timestamp': datetime.now().isoformat()
    }), 200

@app.route('/chat', methods=['POST'])
def chat():
    """Chat endpoint - accepts user message and returns bot response"""
    try:
        data = request.json
        
        if not data or 'message' not in data:
            return jsonify({'error': 'No message provided'}), 400
        
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Empty message'}), 400
        
        # Prefer Gemini; fallback to rule-based
        bot_response = get_gemini_response(user_message) or get_bot_response(user_message)
        
        return jsonify({
            'success': True,
            'userMessage': user_message,
            'botResponse': bot_response,
            'timestamp': datetime.now().isoformat()
        }), 200
    
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            'error': 'Error processing message',
            'details': str(e)
        }), 500

@app.route('/info', methods=['GET'])
def info():
    """Get portfolio context information"""
    return jsonify(PORTFOLIO_CONTEXT), 200

@app.route('/', methods=['GET'])
def index():
    """Root endpoint"""
    return jsonify({
        'service': 'Dhyey Portfolio Chatbot',
        'version': '1.0.0',
        'endpoints': {
            '/chat': 'POST - Send message to chatbot',
            '/health': 'GET - Health check',
            '/info': 'GET - Portfolio information'
        }
    }), 200

if __name__ == '__main__':
    port = int(os.getenv('CHATBOT_PORT') or os.getenv('PORT', 8000))
    debug = os.getenv('DEBUG', 'False') == 'True'
    app.run(host='0.0.0.0', port=port, debug=debug)
