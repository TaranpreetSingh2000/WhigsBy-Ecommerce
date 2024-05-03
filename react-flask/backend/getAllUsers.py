from flask import Flask, request, jsonify, Blueprint
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

user_count_app = Blueprint('user_count_app', __name__)

@user_count_app.route('/users', methods=['GET'])
def get_all_users():
    try:
        # Query the database to retrieve all users
        conn = sqlite3.connect('whigsby.db')
        cursor = conn.cursor()

        cursor.execute('''
            SELECT id, name, email FROM users
        ''')

        users = cursor.fetchall()
        user_count = len(users)
        conn.close()

        if users:
            users_data = []
            for user in users:
                user_data = {
                    "id": user[0],
                    "name": user[1],
                    "email": user[2]
                }
                users_data.append(user_data)

            response_data = {
                "user_count": user_count,
                "users": users_data
            }
            return jsonify(response_data), 200
        else:
            return jsonify({"error": "No users found"}), 404

    except sqlite3.Error as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
