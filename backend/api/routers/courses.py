
from api.models import Courses
from fastapi import APIRouter
from api.deps import (
    db_dependency,
    user_dependency
    
)

router = APIRouter(prefix="/courses", tags=["courses"])

@router.get("/")
async def courses(user: user_dependency, db: db_dependency):

    courses = db.query(Courses).all()

    return {"message": courses}