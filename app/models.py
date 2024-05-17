from sqlalchemy import create_engine, Column, String, Integer, Float, DateTime, ForeignKey, Boolean, CheckConstraint, Date
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime, date

Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    fullname = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    CheckConstraint(
        "length(password) >= 8 AND length(password) <= 16", name="password_length_check"
    )


class ExpenseCategory(Base):
    __tablename__ = 'expense_categories'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User')

class IncomeCategory(Base):
    __tablename__ = 'income_categories'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User")


class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    category_id = Column(Integer, ForeignKey('expense_categories.id'))
    amount = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    date = Column(Date, default=date.today)
    user = relationship('User')
    category = relationship('ExpenseCategory')

class Income(Base):
    __tablename__ = "incomes"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    category_id = Column(Integer, ForeignKey('income_categories.id'))
    amount = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    date = Column(Date, default=date.today)
    user = relationship('User')
    category = relationship('IncomeCategory')