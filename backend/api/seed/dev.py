from api.database import SessionLocal, engine, Base
from api.models import User, Courses, AbcedarisAbc, AbecedarisAbcLletres
from api.deps import bcrypt_context
import json, os


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

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

######################################################
def abc_abcedaris_abc(data, db):
    
    for abc in data:
        
        abc_model = AbcedarisAbc(
            id=abc['id'],
            lletres=abc['lletres'],
            courses=abc['courses'],
            abecedaris_id=abc['abecedaris_id']
        )
        db.add(abc_model)
        
    db.commit()


def abecedaris_abc_lletres(data, db):
    for abc in data:
        
        abc_model = AbecedarisAbcLletres(
            id=abc['id'],
            lletres=abc['lletres'],
            lletres_blue=abc['lletres_blue'],
            voice_mp3=abc['voice_mp3'],
            abecedaris_id=abc['abecedaris_id'],
            courses=abc['courses']
        )
        db.add(abc_model)
        
    db.commit()

def abc_dependency(db=SessionLocal()):
    db.query(AbcedarisAbc).delete(synchronize_session=False)
    db.commit()

    db.query(AbecedarisAbcLletres).delete(synchronize_session=False)
    db.commit()

    with open(os.path.join(BASE_DIR, 'code/abc.json'), 'r') as file:
        data = json.load(file)

    abc_abcedaris_abc(data['abcedaris_abc'], db)
    abecedaris_abc_lletres(data['abcedaris_abc_lletres'], db)
###########################################################


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    user_dependency(db)
    courses_dependency(db)
    
    abc_dependency(db)

    db.close()
    
    print("Seed completado.")

if __name__ == "__main__":
    seed()


