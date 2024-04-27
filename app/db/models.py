from sqlalchemy import create_engine, inspect
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, Boolean, Float, DateTime, ForeignKey
from sqlalchemy.orm import sessionmaker
from datetime import datetime

engine = create_engine("sqlite:///todo_list.db")
inspector = inspect(engine)

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    fullname = Column(String(255), nullable=False)
    firstname = Column(String(255), nullable=False)
    gmail = Column(String(255), unique=True, nullable=False)
    phone_number = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)


class TodoItem(Base):
    __tablename__ = "todo_items"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    description = Column(Text, nullable=False)
    completed = Column(Boolean, default=False)


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float, nullable=False)
    description = Column(Text, nullable=False)
    date = Column(DateTime, default=datetime.utcnow())


class Income(Base):
    __tablename__ = "incomes"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float, nullable=False)
    description = Column(Text, nullable=False)
    date = Column(DateTime, default=datetime.utcnow())


Session = sessionmaker(bind=engine)


def create_tables(engine):
    """
    Creates all tables in the database if they don't already exist.
    """
    if not inspector.has_table('users') and not inspector.has_table('todo_items') and not inspector.has_table('expenses') and not inspector.has_table('incomes'):
        Base.metadata.create_all(engine)


session = Session()

create_tables(engine)

session.close()