from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import sqlite3
import jwt
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

app.config['DEBUG']=True
def create_user_table():
    try:
       with sqlite3.connect('whigsby.db') as conn:
        cursor = conn.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                mobile TEXT NOT NULL
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS admin (
                id INTEGER PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'admin'
            )
        ''')

        conn.commit()
        conn.close()
        print("Table 'users' created successfully")

    except sqlite3.Error as e:
        print(f"Error occurred: {e}")

# Call the function to create 'users' table before starting the Flask app
create_user_table()

@app.route('/register', methods=['POST'])
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
    
    
# Query to get get the registered email
@app.route('/users/<email>', methods=['GET'])
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
    
    # Route to handle user login (POST method)
@app.route('/login', methods=['POST'])
def login():
    try:
        # Get login data from the request
        login_data = request.get_json()
        email = login_data['email']
        password = login_data['password']

        # Basic validation (you can add more validation logic here)
        if not email or not password:
            return jsonify({"error": "All fields are required"}), 400

        # Query the database to check if the user exists
        conn = sqlite3.connect('whigsby.db')
        cursor = conn.cursor()

        cursor.execute('''
            SELECT email, password FROM users WHERE email=? AND password=?
        ''', (email, password))

        result = cursor.fetchall()

        if result:
            # Extract user email from the result (assuming result[0] is email)
            userdata = result[0]

            # Calculate expiration time for JWT (15 minutes from now)
            exp_time = datetime.now() + timedelta(minutes=15)
            exp_epoch_time = int(exp_time.timestamp())

            # Create payload for JWT token
            payload = {
                "payload": userdata,
                "exp": exp_epoch_time
            }

            # Encode payload into JWT token using secret key "shiv"
            secret_key = "shiv"  # Replace with your secret key
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



@app.route('/admin', methods=['POST'])
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


@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        "message": "Congratulations! You have successfully fetched the data from the database"
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
