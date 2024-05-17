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

class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    amount = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    category_name = Column(String, nullable=False)
    date = Column(Date, default=date.today)
    user = relationship('User')

class Income(Base):
    __tablename__ = "incomes"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    amount = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    category_name = Column(String, nullable=False)
    date = Column(Date, default=date.today)
    user = relationship('User')
