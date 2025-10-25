import os
import random
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from dotenv import load_dotenv

from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

load_dotenv()

app = Flask(__name__)
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)

app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD")

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
jwt = JWTManager(app)

def get_dashboard_data():
    cities_weather = [
        {"id": 1, "city": "Tokyo", "temp": 15, "condition": "Cloudy", "humidity": 60, "wind": 10, "feels_like": 14},
        {"id": 2, "city": "New York", "temp": 12, "condition": "Sunny", "humidity": 45, "wind": 5, "feels_like": 12},
        {"id": 3, "city": "London", "temp": 8, "condition": "Rainy", "humidity": 85, "wind": 20, "feels_like": 6},
        {"id": 4, "city": "Sydney", "temp": 25, "condition": "Clear", "humidity": 50, "wind": 15, "feels_like": 25},
    ]
    forecast_data = [
        {"day": "Mon", "max_temp": 18, "min_temp": 12, "condition": "Showers"},
        {"day": "Tue", "max_temp": 20, "min_temp": 14, "condition": "Partly Cloudy"},
        {"day": "Wed", "max_temp": 22, "min_temp": 15, "condition": "Sunny"},
        {"day": "Thu", "max_temp": 21, "min_temp": 15, "condition": "Sunny"},
        {"day": "Fri", "max_temp": 19, "min_temp": 13, "condition": "Cloudy"},
    ]
    alerts = [
        {"id": "a1", "severity": "warning", "message": "High humidity warning for London."},
        {"id": "a2", "severity": "info", "message": "System maintenance scheduled for 5:00 AM UTC."},
    ]
    for city in cities_weather:
        city["temp"] += random.randint(-1, 1)
    forecast_data[0]["max_temp"] += random.randint(-1, 1)
    return {
        "tracked_cities": cities_weather,
        "primary_forecast": {"city": "Tokyo", "forecast": forecast_data},
        "system_alerts": alerts
    }

@app.errorhandler(429)
def ratelimit_handler(e):
    return jsonify(msg=f"Too many requests: {e.description}"), 429


# --- Routes ---

@app.route("/")
@limiter.exempt 
def health_check():
    return jsonify({"status": "healthy"})


@app.route("/login", methods=["POST"])
@limiter.limit("5 per minute")
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email != ADMIN_EMAIL or password != ADMIN_PASSWORD:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@app.route("/api/dashboard", methods=["GET"])
@jwt_required()
@limiter.limit("60 per hour")
def get_dashboard():
    current_user = get_jwt_identity()
    dashboard_data = get_dashboard_data()
    
    return jsonify({
        "user": current_user,
        "data": dashboard_data
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)