from flask import Flask, request, jsonify, Blueprint
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

user_app = Blueprint('user_app', __name__)
# Query to get get the registered email
@user_app.route('/users/<email>', methods=['GET'])
def get_user_by_email(email):
    try:
        # Query the database to retrieve the user by email
        conn = sqlite3.connect('whigsby.db')
        cursor = conn.cursor()

        cursor.execute('''
            SELECT id, name, email, password, mobile FROM users WHERE email=?
        ''', (email,))

        user = cursor.fetchone()
        conn.close()

        if user:
            user_data = {
                "id": user[0],
                "name": user[1],
                # "email": user[2],
                # "password": user[3],
                # "mobile": user[4]
            }
            return jsonify({"user": user_data}), 200
        else:
            return jsonify({"error": "User not found"}), 404

    except sqlite3.Error as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
 
