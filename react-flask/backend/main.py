from flask import Flask
from flask_cors import CORS
from admin import admin_app
from login import login_app
from register import register_app
from getUserEmail import user_app
from database import create_user_table

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Call the function to create 'users' table before starting the Flask app
create_user_table()

# Register blueprints
app.register_blueprint(admin_app)
app.register_blueprint(login_app)
app.register_blueprint(register_app)
app.register_blueprint(user_app)

if __name__ == '__main__':
    app.run(debug=True)