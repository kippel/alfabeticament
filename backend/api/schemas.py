from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class UserCreateRequest(BaseModel):
    username: str
    password: str

class UserRequest(BaseModel):
    username: str
    password: str

class UserCreateRegister(BaseModel):
    username: str
    password: str
    confirmPassword: str


## courses

class CoursesRequest(BaseModel):
    coursesId: str

## abc