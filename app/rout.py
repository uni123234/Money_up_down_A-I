import logging
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from sqlalchemy import create_engine
from werkzeug.exceptions import NotFound
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash, check_password_hash
from models import Base, User, Expense, Income

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder='./frontend/dist/frontend', static_url_path='/')
CORS(app)

engine = create_engine('sqlite:///finance.db')
session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)
Base.metadata.create_all(engine)


@app.route('/', defaults={'path': 'api'})
@app.route('/<path:path>')
def serve(path):
    if path != "" and not path.startswith("/api/"):
        return send_from_directory(app.static_folder, 'index.html')
    raise NotFound()


@app.route('/', methods=['POST','GET'], defaults={'path': 'signup'})
@app.route('/<path:path>')
def signup(path):
    if path != "" and not path.startswith("/api/"):
        return send_from_directory(app.static_folder, 'signup/index.html')
    session = Session()
    data = request.get_json()
    if not data:
        return jsonify(status="error", message="No JSON data provided"), 400

    required_fields = ['email', 'password', 'fullname']
    if not all(field in data for field in required_fields):
        return jsonify(status="error", message="Missing data"), 400
    try:
        existing_user = session.query(User).filter(
            User.email == data['email']).first()
        if existing_user:
            return jsonify(status="error", message="Email already exists"), 400
        hashed_password = generate_password_hash(data['password'])
        new_user = User(fullname=data['fullname'],
                        email=data['email'], password=hashed_password)
        session.add(new_user)
        session.commit()
        return jsonify(status="success", message="User created"), 201
    except SQLAlchemyError as e:
        logger.error(f"Error creating user: {e}")
        session.rollback()
        return jsonify(status="error", message="Server error"), 500
    finally:
        session.close()
    raise NotFound()


@app.route('/', methods=['POST','GET'], defaults={'path': 'login'})
@app.route('/<path:path>')
def login(path):
    if path != "" and not path.startswith("/api/"):
        return send_from_directory(app.static_folder, 'login/index.html')
    session = Session()
    data = request.get_json()
    if not data:
        return jsonify({"status": "error", "message": "No JSON data provided"}), 400

    required_fields = ['email', 'password']
    if not all(field in data for field in required_fields):
        return jsonify({"status": "error", "message": "Missing data"}), 400

    try:
        user = session.query(User).filter(User.email == data['email']).first()
        if user and check_password_hash(user.password, data['password']):
            return jsonify({"status": "success", "message": "Logged in"})
        else:
            return jsonify({"status": "error", "message": "Invalid credentials"}), 401
    finally:
        session.close()
    raise NotFound()
    

@app.route('/', methods=['POST','GET'], defaults={'path': 'income'})
@app.route('/<path:path>')
def add_income(path):
    if path != "" and not path.startswith("/api/"):
        return send_from_directory(app.static_folder, 'income/index.html')
    session = Session()
    data = request.get_json()
    if not data:
        return jsonify({"status": "error", "message": "No JSON data provided"}), 400

    required_fields = ['user_id', 'amount', 'description']
    if not all(field in data for field in required_fields):
        return jsonify({"status": "error", "message": "Missing data"}), 400

    try:
        new_income = Income(
            user_id=data['user_id'], amount=data['amount'], description=data['description'])
        session.add(new_income)
        session.commit()
        return jsonify({"status": "success", "message": "Income added"}), 201
    except SQLAlchemyError as e:
        logger.error(f"Error adding income: {e}")
        session.rollback()
        return jsonify({"status": "error", "message": "Server error"}), 500
    finally:
        session.close()
    raise NotFound()


@app.route('/', methods=['POST','GET'], defaults={'path': 'expense'})
@app.route('/<path:path>')
def add_expense(path):
    if path != "" and not path.startswith("/api/"):
        return send_from_directory(app.static_folder, 'expense/index.html')
    session = Session()
    data = request.get_json()
    if not data:
        return jsonify({"status": "error", "message": "No JSON data provided"}), 400

    required_fields = ['user_id', 'amount', 'description']
    if not all(field in data for field in required_fields):
        return jsonify({"status": "error", "message": "Missing data"}), 400

    try:
        new_expense = Expense(
            user_id=data['user_id'], amount=data['amount'], description=data['description'])
        session.add(new_expense)
        session.commit()
        return jsonify({"status": "success", "message": "Expense added"}), 201
    except SQLAlchemyError as e:
        logger.error(f"Error adding expense: {e}")
        session.rollback()
        return jsonify({"status": "error", "message": "Server error"}), 500
    finally:
        session.close()
    raise NotFound()


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
