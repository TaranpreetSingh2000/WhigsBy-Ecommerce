from flask import Flask
from flask_cors import CORS
from admin import admin_app
from login import login_app
from register import register_app
from getUserEmail import user_app
from database import create_user_table
from getAllUsers import user_count_app
# from index import razorpay_app

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Call the function to create 'users' table before starting the Flask app
create_user_table()

# Register blueprints
app.register_blueprint(admin_app)
app.register_blueprint(login_app)
app.register_blueprint(register_app)
app.register_blueprint(user_app)
app.register_blueprint(user_count_app)
# app.register_blueprint(razorpay_app)

if __name__ == '__main__':
    app.run(debug=True)