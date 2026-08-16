from fastapi import APIRouter
from fastapi.params import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from starlette import status
from starlette.exceptions import HTTPException
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserOut, Token, UserLogin, RefreshRequest
from app.security import hash_password, verify_password, create_access_token, create_refresh_token, decode_token

router = APIRouter(prefix='/api/auth', tags=['auth'])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/api/auth/login')

@router.post('/register', response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(user_in:UserCreate, db:Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Email занят')
    new_user = User(email=user_in.email, hashed_password=hash_password(user_in.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post('/login', response_model=Token, status_code=status.HTTP_200_OK)
def login(credentials:UserLogin, db:Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if user == None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Пользователь не найден')
    if not verify_password(credentials.password,user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Пользователь не найден')
    return Token(
        access_token=create_access_token(subject=user.email),
        refresh_token=create_refresh_token(subject=user.email)
    )

def get_current_user(token: str = Depends(oauth2_scheme), db:Session = Depends(get_db)) -> User:
    payload = decode_token(token)
    if payload is None or payload.get('type') != 'access':
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail='Неверный токен')
    user_email = payload.get('sub')
    user = db.query(User).filter(User.email == user_email).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Неверный токен')
    return user

@router.post('/refresh', response_model=Token)
def refresh_token(body: RefreshRequest, db:Session = Depends(get_db)):
    payload = decode_token(body.refresh_token)
    if payload is None or payload.get('type') != 'refresh':
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Неверный токен')
    user_email = payload.get('sub')
    user = db.query(User).filter(User.email == user_email).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Неверный токен')
    return Token(
        access_token=create_access_token(subject=user.email),
        refresh_token=create_refresh_token(subject=user.email)
    )

@router.get('/me', response_model=UserOut)
def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user