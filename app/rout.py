import logging
import jwt
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from werkzeug.exceptions import NotFound
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta, timezone
from models import Base, User, Expense, Income, Category

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder="./frontend/dist/frontend", static_url_path="/")
CORS(app)

engine = create_engine("sqlite:///finance.db")
session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)
Base.metadata.create_all(engine)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and not path.startswith("api/"):
        return send_from_directory(app.static_folder, path)
    else:
        raise NotFound()


@app.route("/signup/", methods=["POST", "GET"], defaults={"path": "signup"})
@app.route("/<path:path>")
def signup(path):
    if request.method == "GET":
        if path != "" and not path.startswith("api/"):
            return send_from_directory(app.static_folder, path)
        else:
            return (
                jsonify(
                    {"status": "error", "message": "GET method not supported here"}
                ),
                405,
            )

    session = Session()
    data = request.get_json()
    if not data:
        session.close()
        return jsonify({"status": "error", "message": "No JSON data provided"}), 400

    required_fields = ["email", "password", "fullname"]
    if not all(field in data for field in required_fields):
        session.close()
        return jsonify({"status": "error", "message": "Missing data"}), 400

    existing_user = session.query(User).filter(User.email == data["email"]).first()
    if existing_user:
        session.close()
        return jsonify({"status": "error", "message": "Email already exists"}), 409

    hashed_password = generate_password_hash(data["password"])
    new_user = User(
        fullname=data["fullname"], email=data["email"], password=hashed_password
    )

    session.add(new_user)
    session.commit()
    session.close()

    return jsonify({"status": "success", "message": "User created"}), 201


@app.route("/login/", methods=["POST", "GET"], defaults={"path": "login"})
@app.route("/<path:path>")
def login(path):
    if request.method == "GET":
        if path != "" and not path.startswith("api/"):
            return send_from_directory(app.static_folder, path)
        else:
            return (
                jsonify(
                    {"status": "error", "message": "GET method not supported here"}
                ),
                405,
            )

    session = Session()
    data = request.get_json()
    if not data:
        session.close()
        return jsonify({"status": "error", "message": "No JSON data provided"}), 400

    user = session.query(User).filter(User.email == data["email"]).first()
    if user and check_password_hash(user.password, data["password"]):
        session.close()
        token_payload = {
            "user_id": user.id,
            "exp": datetime.now(timezone.utc) + timedelta(days=1),
        }
        token = jwt.encode(token_payload, "your_secret_key", algorithm="HS256")
        return jsonify({"status": "success", "token": token})

    session.close()
    return jsonify({"status": "error", "message": "Invalid credentials"}), 401


@app.route("/income/", methods=["POST", "GET"], defaults={"path": "income"})
@app.route("/<path:path>")
def add_income(path):
    if request.method == "GET":
        if path != "" and not path.startswith("api/"):
            return send_from_directory(app.static_folder, path)
        else:
            return (
                jsonify(
                    {"status": "error", "message": "GET method not supported here"}
                ),
                405,
            )

    if request.method == "POST":
        session = Session()
        data = request.get_json()
        if not data:
            session.close()
            return jsonify({"status": "error", "message": "No JSON data provided"}), 400

        required_fields = ["user_id", "amount", "description"]
        if not all(field in data for field in required_fields):
            session.close()
            return jsonify({"status": "error", "message": "Missing data"}), 400

        new_income = Income(
            user_id=data["user_id"],
            amount=data["amount"],
            description=data["description"],
        )
        session.add(new_income)
        session.commit()
        session.close()

        return jsonify({"status": "success", "message": "Income added"}), 201


@app.route("/expense/", methods=["POST", "GET"], defaults={"path": "expense"})
@app.route("/<path:path>")
def add_expense(path):
    if request.method == "GET":
        if path != "" and not path.startswith("api/"):
            expenses = Session.query(Expense).all()
            expense_list = [
                {
                    "id": expense.id,
                    "user_id": expense.user_id,
                    "category_id": expense.category_id,
                    "amount": expense.amount,
                    "description": expense.description,
                    "date": expense.date,
                }
                for expense in expenses
            ]
            return jsonify(expense_list), 200
        else:
            return (
                jsonify(
                    {"status": "error", "message": "GET method not supported here"}
                ),
                405,
            )

    if request.method == "POST":
        session = Session()
        data = request.get_json()
        if not data:
            session.close()
            return jsonify({"status": "error", "message": "No JSON data provided"}), 400

        required_fields = ["email", "amount", "description", "category_id"]
        if not all(field in data for field in required_fields):
            session.close()
            return jsonify({"status": "error", "message": "Missing data"}), 400

        try:
            user = session.query(User).filter_by(email=data["email"]).first()
            if user:
                user_id = user.id
            else:
                return None
        finally:
            session.close()

        new_expense = Expense(
            user_id=user_id,
            amount=data["amount"],
            description=data["description"],
            category_id=data["category_id"],
        )
        session.add(new_expense)
        session.commit()
        session.close()

        return jsonify({"status": "success", "message": "Expense added"}), 201


@app.route("/categories/", methods=["POST", "GET"], defaults={"path": "categories"})
@app.route("/<path:path>")
def add_category(path):
    if request.method == "GET":
        expenses = Session.query(Expense).all()
        expense_list = [
            {
                "id": expense.id,
                "user_id": expense.user_id,
                "category_id": expense.category_id,
                "amount": expense.amount,
                "description": expense.description,
                "date": expense.date,
            }
            for expense in expenses
        ]
        return jsonify(expense_list), 200

    if request.method == "POST":
        session = Session()
        data = request.get_json()
        if not data:
            session.close()
            return jsonify({"status": "error", "message": "No JSON data provided"}), 400

        required_fields = ["user_id", "name"]
        if not all(field in data for field in required_fields):
            session.close()
            return jsonify({"status": "error", "message": "Missing data"}), 400

        new_category = Category(user_id=data["user_id"], name=data["name"])
        session.add(new_category)
        session.commit()
        session.close()

        return jsonify({"status": "success", "message": "Category added"}), 201


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
