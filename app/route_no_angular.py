from datetime import datetime
from flask import Flask, request, render_template, jsonify, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import logging
from models import Base, User, Expense, Income
from functools import wraps

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
app.secret_key = 'KEY'

engine = create_engine('sqlite:///finance.db', echo=True, future=True)
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('You need to login first', 'error')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function


@app.route('/')
def index():
    user_name = None
    if 'user_id' in session:
        session_db = Session()
        user = session_db.query(User).filter_by(id=session['user_id']).first()
        if user:
            user_name = user.fullname
    return render_template('index.html', user_name=user_name)


@app.route('/login/', methods=['GET', 'POST'])
def login():
    session_db = Session()
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        user = session_db.query(User).filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            flash('Login successful!', 'info')
            return redirect(url_for('index'))
        else:
            flash('Invalid username or password', 'error')
    return render_template('login.html')


@app.route('/logout/')
@login_required
def logout():
    session.pop('user_id', None)
    flash('You have been logged out.', 'info')
    return redirect(url_for('index'))


@app.route('/signup/', methods=['GET', 'POST'])
def signup():
    session_db = Session()
    if request.method == 'POST':
        fullname = request.form['fullname']
        email = request.form['email']
        password = request.form['password']
        if session_db.query(User).filter_by(email=email).first():
            flash('Email already registered.', 'error')
            return render_template('signup.html')
        hashed_password = generate_password_hash(password)
        new_user = User(fullname=fullname, email=email,
                        password=hashed_password)
        session_db.add(new_user)
        session_db.commit()
        flash('User registered successfully!', 'success')
        return redirect(url_for('login'))
    return render_template('signup.html')


@app.route('/income/', methods=['GET', 'POST'])
@login_required
def income():
    session_db = Session()
    if request.method == 'POST':
        try:
            user_id = request.form['user_id']
            amount = float(request.form['amount'])
            description = request.form['description']
            new_income = Income(
                user_id=user_id, amount=amount, description=description)
            session_db.add(new_income)
            session_db.commit()
            return jsonify(status='success', message='Income added successfully')
        except Exception as e:
            session_db.rollback()
            logging.error(f"Error adding income: {e}")
            return jsonify(status='error', message='Error processing your request'), 500
    return render_template('income.html')


@app.route('/expense/', methods=['GET', 'POST'])
@login_required
def expense():
    session_db = Session()
    if request.method == 'POST':
        try:
            user_id = request.form['user_id']
            amount = float(request.form['amount'])
            description = request.form['description']
            new_expense = Expense(
                user_id=user_id, amount=amount, description=description)
            session_db.add(new_expense)
            session_db.commit()
            return jsonify(status='success', message='Expense recorded successfully')
        except Exception as e:
            session_db.rollback()
            logging.error(f"Error recording expense: {e}")
            return jsonify(status='error', message='Error processing your request'), 500
    return render_template('expense.html')


@app.errorhandler(404)
def page_not_found(e):
    cat_url = f"https://cataas.com/cat?time={datetime.now().timestamp()}"
    return render_template('404.html', cat_url=cat_url), 404


@app.errorhandler(500)
def internal_server_error(e):
    cat_url = f"https://cataas.com/cat?time={datetime.now().timestamp()}"
    return render_template('500.html', cat_url=cat_url), 500


if __name__ == '__main__':
    app.run(debug=True)
