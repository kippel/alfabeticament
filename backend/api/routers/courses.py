
from api.models import Courses
from fastapi import APIRouter
from api.deps import (
    db_dependency,
    user_dependency
    
)
from api.schemas import CoursesRequest
from api.workouts.auths import user_courses_id, create_user_courses_id, data_red

router = APIRouter(prefix="/courses", tags=["courses"])




'''
    GET /courses
'''
@router.get("/")
async def courses(user: user_dependency, db: db_dependency):

    courses_all = db.query(Courses).all()
    #print(courses_all)
    cour = create_user_courses_id(user, db)
    
    data = data_red(cour)
    
    return {"languages": courses_all, "user_courses": data}




'''
    POST /courses
    coursesId
'''
@router.post("/")
async def courses_post(payload: CoursesRequest, user: user_dependency, db: db_dependency):

    courses_all = db.query(Courses).filter(Courses.courses == payload.coursesId).first()
    
    if not courses_all:
        return {"error": "Course not found"}, 404
    
    cour = user_courses_id(user, db, courses_all)
    
    data = data_red(cour)
    
    
    return {"user_courses": data}


@router.get("/red")
async def courses_red(user: user_dependency, db: db_dependency):

    cour = create_user_courses_id(user, db)
    
    data = data_red(cour)

    return { "courses" : data}