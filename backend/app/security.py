from datetime import timedelta, datetime, timezone
import bcrypt
from app.config import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM, SECRET_KEY, REFRESH_TOKEN_EXPIRE_DAYS
from jose import jwt, JWTError


def hash_password(password: str)-> str:
    password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
    password_decode = password.decode()
    return password_decode

def verify_password(plain_password:str, hashed_password:str)-> bool:
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())

def create_access_token(subject:str, expires_delta: timedelta | None = None)-> str:
    if expires_delta == None:
        expire_delta_final = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    else:
        expire_delta_final = datetime.now(timezone.utc) + expires_delta
    payload = {
        'sub': subject,
        'exp': expire_delta_final,
        'type': 'access'
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(subject:str)-> str:
    final_refresh_token = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    payload = {
        'sub': subject,
        'exp': final_refresh_token,
        'type': 'refresh'
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token:str)-> dict | None:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None