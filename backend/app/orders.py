from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session
from app.auth import get_current_user_order
from app.database import get_db
from app.models import User, Order, OrderItem
from app.schemas import OrderOut, OrderCreate
from starlette.exceptions import HTTPException
from starlette import status

router = APIRouter(prefix='/api/order', tags=['order'])

@router.post('/', response_model=OrderOut)
def orders(order: OrderCreate, db:Session = Depends(get_db), current_user: User | None = Depends(get_current_user_order)):
    if current_user:
        user_id = current_user.id
    else:
        user_id = None
    status = 'Оформляем'
    total_price = sum(item.price*item.total_count for item in order.items)
    new_order = Order(first_name=order.first_name, last_name=order.last_name,number=order.number, email=order.email, address=order.address, user_id=user_id, total_price=total_price, status=status)
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    for item in order.items:
        db.add(OrderItem(
            order_id=new_order.id,
            product_id=item.product_id,
            product_name=item.product_name,
            price=item.price,
            total_count=item.total_count
        ))
    db.commit()
    return  new_order

@router.get('/me', response_model=list[OrderOut])
def read_current_orders(get_orders: User | None = Depends(get_current_user_order),db: Session = Depends(get_db)):
    if get_orders:
        order = db.query(Order).filter(Order.user_id == get_orders.id).all()
        return order
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Пользователь не найден')