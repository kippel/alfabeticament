from datetime import timedelta, datetime, timezone
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from dotenv import load_dotenv
import os
from api.deps import (
    db_dependency,
    bcrypt_context 
)
from api.models import User

load_dotenv()

router = APIRouter( prefix="/auth", tags=["auth"])

SECRET_KEY = os.getenv("AUTH_SECRET_KEY")
ALGORITHM = os.getenv("AUTH_ALGORITHM")

class Token(BaseModel):
    access_token: str
    token_type: str

class UserCreateRequest(BaseModel):
    username: str
    password: str

class UserRequest(BaseModel):
    username: str
    password: str
    

def authenticate_user(username: str, password: str, db):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

''' 
def create_access_token(username: str, user_id: int, expires_delta: timedelta | None = None):
    encode = {"sub": username, "id": user_id}
    expires = datetime.now(timezone.utc) + expires_delta
    encode.update({"exp": expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)
'''
def create_access_token(username: str, user_id: int, expires_delta: timedelta | None = None):
    encode = {"sub": username, "id": user_id}
    to_encode = encode.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    #expires = datetime.now(timezone.utc) + expires_delta
    #encode.update({"exp": expires})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM) 


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_user( db: db_dependency, create_user_request: UserCreateRequest):
    create_user_model = User(
        username=create_user_request.username,
        hashed_password=bcrypt_context.hash(create_user_request.password)
    )
    db.add(create_user_model)
    db.commit()

    return {"message": create_user_request}


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                                 db: db_dependency):
    
    print(form_data)
    print("eeeeeeeeeee")
    user = authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token(
        username=user.username,
        user_id=user.id,        
        expires_delta=timedelta(minutes=30)
    )
    
    return {"access_token": token, "token_type": "bearer"}

'''
@router.post("/login")
async def login_token(users: UserRequest, db: db_dependency):

    #print(form_data)
    
    user = authenticate_user(users.username, users.password, db)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token(
        username=user.username,
        user_id=user.id,        
        expires_delta=timedelta(minutes=30)
    )
    
    user_id = {
       "sub": user.username,
       "id": user.id
    }

    return {"access_token": token, "token_type": "bearer", "user" : user_id}
'''
    