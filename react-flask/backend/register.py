from flask import Flask, request, jsonify, Blueprint
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

register_app = Blueprint('register_app', __name__)

@register_app.route('/register', methods=['POST'])
def register():
    try:
        register_data = request.get_json()
        name = register_data['name']
        email = register_data['email']
        password = register_data['password']
        mobile = register_data['mobile']

        conn = sqlite3.connect('whigsby.db')
        cursor = conn.cursor()

        cursor.execute('''
            INSERT INTO users (name, email, password, mobile)
            VALUES (?, ?, ?, ?)
        ''', (name, email, password, mobile))

        conn.commit()
        conn.close()

        return jsonify({"message": "Registration successful"}), 201

    except sqlite3.Error as e:
        return jsonify({"error": f"Registration failed: {str(e)}"}), 500

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    