"""
This module defines the ORM models for the Money Up/Down application.

It includes the following models:
- BaseModel: An abstract base model that includes common columns.
- User: Represents a user in the application, storing full name, email, and password.
- Expense: Represents an expense record linked to a user, including details such as amount, 
- description, category, and date.
- Income: Represents an income record linked to a user, including details such as amount, 
- description, category, and date.

These models use SQLAlchemy's ORM features to map Python classes to database tables.
"""

from sqlalchemy import (
    String,
    Integer,
    Float,
    ForeignKey,
    CheckConstraint,
)
from sqlalchemy.orm import declarative_base, relationship, mapped_column

Base = declarative_base()


class BaseModel(Base):
    """
    A base model class that includes common columns like the primary key.
    This class is abstract and meant to be inherited by other models.
    """

    __abstract__ = True

    id = mapped_column(Integer, primary_key=True)
    """
    The primary key for the table, inherited by all models.
    """


class User(BaseModel):
    """
    Represents a user in the application.
    Stores user's full name, email, and password.
    """

    __tablename__ = "users"

    fullname = mapped_column(String(255), nullable=False)
    """
    The full name of the user. This field is mandatory.
    """

    email = mapped_column(String(255), unique=True, nullable=False)
    """
    The email address of the user. This field is unique and mandatory.
    """

    password = mapped_column(String(255), nullable=False)
    """
    The user's password. This field is mandatory and must be between 8 and 16 characters.
    """

    __table_args__ = (
        CheckConstraint(
            "length(password) >= 8 AND length(password) <= 16",
            name="password_length_check",
        ),
    )


class Expense(BaseModel):
    """
    Represents an expense record linked to a user.
    Stores details such as the user who made the expense,
    the amount, a description,
    category, and date.
    """

    __tablename__ = "expenses"

    user_id = mapped_column(Integer, ForeignKey("users.id"))
    """
    Foreign key referencing the user who made the expense.
    """

    amount = mapped_column(Float, nullable=False)
    """
    The amount of the expense. This field is mandatory.
    """

    description = mapped_column(String, nullable=False)
    """
    A brief description of the expense. This field is mandatory.
    """

    category_name = mapped_column(String, nullable=False)
    """
    The category under which the expense falls (e.g., Food, Transport). This field is mandatory.
    """

    date = mapped_column(String, nullable=False)
    """
    The date on which the expense occurred. This field is mandatory.
    """

    user = relationship("User")
    """
    The relationship to the `User` model, representing the user who made the expense.
    """


class Income(BaseModel):
    """
    Represents an income record linked to a user.
    Stores details such as the user who received the income, the amount,
    a description, category, and date.
    """

    __tablename__ = "incomes"

    user_id = mapped_column(Integer, ForeignKey("users.id"))
    """
    Foreign key referencing the user who received the income.
    """

    amount = mapped_column(Float, nullable=False)
    """
    The amount of the income. This field is mandatory.
    """

    description = mapped_column(String, nullable=False)
    """
    A brief description of the income. This field is mandatory.
    """

    category_name = mapped_column(String, nullable=False)
    """
    The category under which the income falls (e.g., Salary, Freelance). This field is mandatory.
    """

    date = mapped_column(String, nullable=False)
    """
    The date on which the income was received. This field is mandatory.
    """

    user = relationship("User")
    """
    The relationship to the `User` model, representing the user who received the income.
    """
