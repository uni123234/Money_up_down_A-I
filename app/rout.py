from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session, joinedload
from werkzeug.exceptions import NotFound
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta, timezone
import jwt
import logging

from models import Base, User, Expense, Income

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder="./frontend/dist/frontend", static_url_path="/")
CORS(app)

engine = create_engine("sqlite:///finance.db")
session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)
Base.metadata.create_all(engine)


def get_user_id_by_email(email):
    session = Session()
    try:
        user = session.query(User).filter_by(email=email).first()
        if user:
            return user.id
        else:
            return None
    finally:
        session.close()


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
@app.route("/income/<int:id>", methods=["PUT"])
@app.route("/<path:path>")
def income_handler(path=None, id=None):
    if request.method == "GET":
        if path and path != "" and not path.startswith("api/"):
            session = Session()
            incomes = session.query(Income).all()

            income_list = [
                {
                    "id": income.id,
                    "user_id": income.user_id,
                    "category_name": income.category_name,
                    "amount": income.amount,
                    "description": income.description,
                    "date": income.date,
                }
                for income in incomes
            ]
            session.close()
            return jsonify(income_list), 200
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

        required_fields = ["email", "amount", "description", "date", "category_name"]
        if not all(field in data for field in required_fields):
            session.close()
            return jsonify({"status": "error", "message": "Missing data"}), 400

        user_id = get_user_id_by_email(data["email"])

        new_income = Income(
            user_id=user_id,
            amount=data["amount"],
            description=data["description"],
            category_name=data["category_name"],
            date=data["date"],
        )
        session.add(new_income)
        session.commit()
        session.close()

        return jsonify({"status": "success", "message": "Income added"}), 201

    if request.method == "PUT":
        print("Received PUT request")
        if not id:
            return jsonify({"status": "error", "message": "No ID provided"}), 400

        session = Session()
        data = request.get_json()
        if not data:
            session.close()
            return jsonify({"status": "error", "message": "No JSON data provided"}), 400

        income = session.query(Income).filter(Income.id == id).first()
        if not income:
            session.close()
            return jsonify({"status": "error", "message": "Income not found"}), 404

        if "amount" in data:
            income.amount = data["amount"]
        if "description" in data:
            income.description = data["description"]
        if "date" in data:
            income.date = data["date"]
        if "category_name" in data:
            income.category_name = data["category_name"]

        session.commit()
        session.close()

        return jsonify({"status": "success", "message": "Income updated"}), 200



@app.route("/expense/", methods=["POST", "GET"], defaults={"path": "expense"})
@app.route("/expense/<int:id>", methods=["PUT"])
@app.route("/<path:path>")
def expense_handler(path=None, id=None):
    if request.method == "GET":
        if path and path != "" and not path.startswith("api/"):
            session = Session()
            expenses = session.query(Expense).all()

            expense_list = [
                {
                    "id": expense.id,
                    "user_id": expense.user_id,
                    "category_name": expense.category_name,
                    "amount": expense.amount,
                    "description": expense.description,
                    "date": expense.date,
                }
                for expense in expenses
            ]
            session.close()
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

        required_fields = ["email", "amount", "description", "date", "category_name"]
        if not all(field in data for field in required_fields):
            session.close()
            return jsonify({"status": "error", "message": "Missing data"}), 400

        user_id = get_user_id_by_email(data["email"])

        new_expense = Expense(
            user_id=user_id,
            amount=data["amount"],
            description=data["description"],
            category_name=data["category_name"],
            date=data["date"],
        )
        session.add(new_expense)
        session.commit()
        session.close()

        return jsonify({"status": "success", "message": "Expense added"}), 201

    if request.method == "PUT":
        print("Received PUT request")
        if not id:
            return jsonify({"status": "error", "message": "No ID provided"}), 400

        session = Session()
        data = request.get_json()
        if not data:
            session.close()
            return jsonify({"status": "error", "message": "No JSON data provided"}), 400

        expense = session.query(Expense).filter(Expense.id == id).first()
        if not expense:
            session.close()
            return jsonify({"status": "error", "message": "Expense not found"}), 404

        if "amount" in data:
            expense.amount = data["amount"]
        if "description" in data:
            expense.description = data["description"]
        if "date" in data:
            expense.date = data["date"]
        if "category_name" in data:
            expense.category_name = data["category_name"]

        session.commit()
        session.close()

        return jsonify({"status": "success", "message": "Expense updated"}), 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
