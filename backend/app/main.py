from fastapi import FastAPI
from starlette import status
from starlette.exceptions import HTTPException
from starlette.middleware.cors import CORSMiddleware
from app import models
from app.database import engine, get_db
from app.models import Product
from sqlalchemy.orm import Session
from fastapi.params import Depends
from app.schemas import ProductSchema
from typing import List
from app.auth import router as auth_router, get_current_user



models.Base.metadata.create_all(bind=engine)
app = FastAPI(title="online-shop", description="Проект для 11 класса", version="0.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
@app.get("/")
def read_root():
    return {"Hello": "World"}
@app.get('/api/products', response_model=List[ProductSchema])
def get_products(db:Session = Depends(get_db)):
    products = db.query(Product).all()
    return products
@app.get('/api/products/{product_id}', response_model=ProductSchema)
def get_product(product_id:int ,db:Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Товар не найден')
    return product