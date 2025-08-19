from api.database import SessionLocal, engine, Base
from api.models import (
    User, 
    Courses, 
    AbcedarisAbc, 
    AbecedarisAbcLletres,
    AbcBar,
    AbcList,
    AbcUn,
    AbcDos
)
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


    abc_dependency(Courses, data, db)
  
def abc_dependency_bar(db=SessionLocal()):
    db.query(AbcedarisAbc).delete(synchronize_session=False)
    db.commit()

    db.query(AbecedarisAbcLletres).delete(synchronize_session=False)
    db.commit()

    with open(os.path.join(BASE_DIR, 'code/abc.json'), 'r') as file:
        data = json.load(file)

    abc_dependency(AbcedarisAbc, data['abcedaris_abc'], db)
    abc_dependency(AbecedarisAbcLletres, data['abcedaris_abc_lletres'], db)

    
###########################################################
def abc_bar_dependency(db=SessionLocal()):
    for bar in [AbcBar, AbcList, AbcUn, AbcDos]:
        db.query(bar).delete(synchronize_session=False)
        db.commit()

    with open(os.path.join(BASE_DIR, 'code/abc_bar.json'), 'r') as file:
        data = json.load(file)
    
    abc_dependency(AbcBar, data['abc_bar'], db)
    abc_dependency(AbcList, data['abc_list'], db)
    abc_dependency(AbcUn, data['abc_un'], db)
    abc_dependency(AbcDos, data['abc_dos'], db)

def abc_dependency(abcabc, data, db):
    for abc in data:
        abc_model = abcabc(**abc)
        db.add(abc_model)
        
    db.commit()


##############################################################
def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    #########
    user_dependency(db)
    courses_dependency(db)
    ##########
    abc_dependency_bar(db)
    ##########
    abc_bar_dependency(db)

    ############
    db.close()
    
    print("Seed completado.")

if __name__ == "__main__":
    seed()


