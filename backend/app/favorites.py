from app.auth import get_current_user
from app.database import get_db
from app.models import User, Product, Favorite
from app.schemas import FavoriteCreate, FavoriteOut
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

router = APIRouter(prefix='/api/favorites', tags=['favorites'])

@router.post('/', response_model=FavoriteOut)
def favorite_product(favorite:FavoriteCreate, db:Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    product = db.query(Product).filter(Product.id == favorite.product_id).first()
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Товара нет')
    fr = db.query(Favorite).filter(Favorite.user_id == current_user.id, Favorite.product_id == favorite.product_id).first()
    if fr:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Товар уже в избранном')
    new_favorite = Favorite(user_id=current_user.id,product_id=favorite.product_id)
    db.add(new_favorite)
    db.commit()
    db.refresh(new_favorite)
    return new_favorite

@router.delete('/{product_id}')
def delete_favorite(product_id:int ,db:Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    delete_fav = db.query(Favorite).filter(Favorite.user_id == current_user.id, Favorite.product_id == product_id).first()
    if delete_fav:
        db.delete(delete_fav)
        db.commit()
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail='Не найдено')

@router.get('/me', response_model=list[FavoriteOut])
def get_favorites(current_user: User = Depends(get_current_user), db:Session = Depends(get_db)):
    get_fav = db.query(Favorite).filter(Favorite.user_id == current_user.id).all()
    return get_fav