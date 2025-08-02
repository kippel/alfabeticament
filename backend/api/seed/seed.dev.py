from api.database import SessionLocal, engine, Base
from api.models import User, Courses
from api.deps import bcrypt_context
import json, os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
#file_path = os.path.join(BASE_DIR, '../../code/courses.json')

def user_dependency(db=SessionLocal()):
    
    db.query(User).delete(synchronize_session=False)
    db.commit()

    users = [
        User(username="kippel", hashed_password=bcrypt_context.hash("qwerty")),
    ]

    db.add_all(users)
    db.commit()
    db.close()

def courses_dependency(db=SessionLocal()):
    db.query(Courses).delete(synchronize_session=False)
    db.commit()

    with open(os.path.join(BASE_DIR, 'code/courses.json'), 'r') as file:
        data = json.load(file)

    for course in data:
        course_model = Courses(
            id=course['id'],
            title=course['title'],
            image_src=course['imageSrc'],
            courses=course['courses']
        )
        db.add(course_model)
        
    db.commit()


def seed():
    Base.metadata.create_all(bind=engine)  # Crea tablas si no existen
    db = SessionLocal()

    user_dependency(db)
    courses_dependency(db)

    db.close()
    
    print("Seed completado.")

if __name__ == "__main__":
    seed()
