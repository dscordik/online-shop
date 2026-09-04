from sqlalchemy import Column, Integer, String, Boolean, DateTime, func, Enum, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base

class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True)
    price = Column(Integer)
    image_url = Column(String)
    category = Column(String)
    description = Column(String)

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Order(Base):
    __tablename__ = 'orders'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer,nullable=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    number = Column(String, nullable=False)
    email = Column(String, nullable=False)
    address = Column(String, nullable=False)
    total_price = Column(Integer, nullable=False)
    status = Column(Enum('Оформляем', 'Собираем', 'Доставляем', 'Готов к получению'), nullable=False)
    created_at_order = Column(DateTime(timezone=True),server_default=func.now(), nullable=False)
    items = relationship('OrderItem')

class OrderItem(Base):
    __tablename__ = 'orderItem'

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer,ForeignKey('orders.id'), nullable=False )
    product_id = Column(Integer, nullable=False)
    product_name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    total_count = Column(Integer, nullable=False)
    order = relationship('Order')