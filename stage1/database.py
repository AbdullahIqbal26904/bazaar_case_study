from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime

# Define database
DATABASE_URL = "sqlite:///inventory.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine)

class Product(Base):
    """Product Model"""
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String)
    price = Column(Integer)
    stock_quantity = Column(Integer, default=0)

class StockMovement(Base):
    """Stock Movement Model"""
    __tablename__ = "stock_movements"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    movement_type = Column(String)  # "stock-in", "sold", "manual-removal"
    quantity = Column(Integer)
    timestamp = Column(DateTime, default=datetime.now)

class Logs(Base):
    """Logs Table for Actions Performed"""
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    action = Column(String)
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer)
    timestamp = Column(DateTime, default=datetime.now)

# Create tables
Base.metadata.create_all(engine)
