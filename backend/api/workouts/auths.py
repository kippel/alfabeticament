from api.deps import (
    db_dependency,
    user_dependency
)
from api.models import UserCourses, Courses




def user_courses_id(user: user_dependency, db: db_dependency, courses_all: Courses):
    user_courses = db.query(UserCourses).filter(UserCourses.user_id == user['id']).first()
    
    if not user_courses:
        cour = UserCourses(
           courses_title=courses_all.courses_title,
           image_src=courses_all.image_src,
           courses=courses_all.courses,
           user_id=user['id']
        )

        db.add(cour)
        db.commit()

    else:
        db.query(UserCourses) \
                .filter(UserCourses.user_id == user['id']) \
                .update({
                   "courses_title" : courses_all.title,
                   "image_src" : courses_all.image_src,
                   "courses" : courses_all.courses
                })
        db.commit()

        cour = db.query(UserCourses).filter(UserCourses.user_id == user['id']).first()
    return cour

def create_user_courses_id(user: user_dependency, db: db_dependency):
    user_courses = db.query(UserCourses).filter(UserCourses.user_id == user['id']).first()
    if not user_courses:
        cour = UserCourses(
           courses_title='Catala',
           image_src="/flag/Catala.svg",
           courses="ca",
           user_id=user['id']
        )

        db.add(cour)
        db.commit()
    else:
        cour = user_courses
    
    return cour

def data_red(cour):
    data = {
         "courses_title": cour.courses_title,
         "image_src" : cour.image_src,
         "courses" : cour.courses
    }
    return data
