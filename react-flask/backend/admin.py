from flask import Flask, request, jsonify, make_response, Blueprint
from flask_cors import CORS
import sqlite3
from datetime import datetime, timedelta
import jwt

app = Flask(__name__)
CORS(app)

admin_app = Blueprint('admin_app', __name__)

@admin_app.route('/admin', methods=['POST'])
def admin_login():
    try:
        # Get login data from the request
        login_data = request.get_json()
        email = login_data['email']
        password = login_data['password']
        role=login_data['role']

        # Basic validation (you can add more validation logic here)
        if not email or not password:
            return jsonify({"error": "All fields are required"}), 400

        # Query the database to check if the user exists
        conn = sqlite3.connect('whigsby.db')
        cursor = conn.cursor()

        cursor.execute('''
            SELECT email, password, role FROM admin WHERE email=? AND password=? AND role=?
        ''', (email, password, role))

        result = cursor.fetchall()

        if result:
            # Extract user email from the result (assuming result[0] is email)
            admin_data = result[0]

            # Calculate expiration time for JWT (15 minutes from now)
            exp_time = datetime.now() + timedelta(minutes=15)
            exp_epoch_time = int(exp_time.timestamp())

            # Create payload for JWT token
            payload = {
                "email": admin_data[0],
                "role":"Admin",
                "exp": exp_epoch_time
            }

            # Encode payload into JWT token using secret key "shiv"
            secret_key = "taran"  # Replace with your secret key
            jwttoken = jwt.encode(payload, secret_key, algorithm="HS256")

            # Create a response object with the JWT token
            response = make_response(jsonify({"token": jwttoken}), 201)
            
            return response

        else:
            return jsonify({"error": "Invalid credentials"}), 401

    except sqlite3.Error as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    except KeyError:
        return jsonify({"error": "Invalid request data format"}), 400

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

    finally:
        if conn:
            conn.close()