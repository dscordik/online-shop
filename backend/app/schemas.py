import bcrypt
from pydantic import BaseModel, ConfigDict, field_validator,EmailStr

class ProductSchema(BaseModel):
    id: int
    title: str
    price: int
    image_url: str
    category: str

    model_config = ConfigDict(from_attributes=True)

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    @field_validator('password')
    @classmethod
    def validator(cls, v:str) -> str:
        if len(v) < 8:
            raise ValueError('Пароль должен быть 8 символов')
        if not any(c.isalpha() for c in v):
            raise ValueError('Пароль должен содержать буквы')
        if not any(c.isdigit() for c in v):
            raise ValueError('Пароль должен содержать цифры')
        if len(v.encode()) > 72:
            raise ValueError('Пароль не должен содержать более 72 байт')
        return v

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    is_active: bool

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = 'bearer'

class RefreshRequest(BaseModel):
    refresh_token: str