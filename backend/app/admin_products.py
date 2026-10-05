from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session
from starlette import status
from starlette.exceptions import HTTPException
from app.auth import get_current_admin
from app.database import get_db
from app.models import User, Product
from app.schemas import ProductCreate, ProductSchema, ProductUpdate

router = APIRouter(prefix='/api/admin/products', tags=['admin-products'])

@router.post('/', response_model=ProductSchema)
def create_product(body:ProductCreate, current_user: User = Depends(get_current_admin),db:Session = Depends(get_db)):
    product = Product(
        title = body.title,
        price = body.price,
        image_url = body.image_url,
        category = body.category,
        description = body.description
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

@router.patch('/{product_id}', response_model=ProductSchema)
def update_current_product(product_id:int, body:ProductUpdate, current_user: User = Depends(get_current_admin), db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Товар не найден')
    if body.title is not None:
        product.title = body.title
    if body.price is not None:
        product.price = body.price
    if body.image_url is not None:
        product.image_url = body.image_url
    if body.category is not None:
        product.category = body.category
    if body.description is not None:
        product.description = body.description
    db.commit()
    db.refresh(product)
    return product

@router.delete('/{product_id}')
def delete_current_product(product_id:int, current_user: User = Depends(get_current_admin), db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Товар не найден')
    db.delete(product)
    db.commit()
    return {'message':'Товар удален'}