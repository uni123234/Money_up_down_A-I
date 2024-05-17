from sqlalchemy import (
    create_engine,
    Column,
    String,
    Integer,
    Float,
    DateTime,
    ForeignKey,
    Boolean,
    CheckConstraint,
)
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

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


class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User")


class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))
    amount = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.now)
    user = relationship("User")
    category = relationship("Category")


class Income(Base):
    __tablename__ = "incomes"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))
    amount = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    date = Column(DateTime, default=datetime.now)
    user = relationship("User")
    category = relationship("Category")
