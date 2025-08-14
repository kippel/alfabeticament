from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship, backref
from .database import Base
# Define the association table for the many-to-many relationship



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    user_courses = relationship("UserCourses", backref=backref('users', uselist = False))  

class Courses(Base):
    __tablename__ = "courses"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True)
    image_src = Column(String, unique=True)
    courses = Column(String, unique=True)


class UserCourses(Base):
    __tablename__ = "user_courses"
    id = Column(Integer, primary_key=True, index=True)
     
    courses_title = Column(String, unique=True)
    image_src = Column(String, unique=True)
    courses = Column(String, unique=True)
    user_id = Column(Integer(), ForeignKey('users.id')) 


class AbcedarisAbc(Base):
    __tablename__ = "abcedaris_abc"
    id = Column(Integer, primary_key=True, index=True)
    lletres = Column(String)
    courses = Column(String)
    abecedaris_id = Column(Integer)

class AbecedarisAbcLletres(Base):
    __tablename__ = "abcedaris_abc_lletres"
    id = Column(Integer, primary_key=True, index=True)

    lletres = Column(String)
    lletres_blue = Column(String)
    voice_mp3 = Column(String) 
    abecedaris_id = Column(Integer) 

''' 
class AbecedAbcLletres(Base):
    __tablename__ = "abced_abc_lletres"
    id = Column(Integer, primary_key=True, index=True)

    voice_mp3 =  Column(String, unique=True) 
    abecedaris_id = Column(Integer, unique=True)
    courses = Column(String, unique=True)
'''

''' 
model Abecedari_abc {
  id        Int      @default(autoincrement()) @id
  lletres   String
  abecedariId Int
  courses String
}

model Abecedari_abc_lletres {
  id          Int      @default(autoincrement()) @id
  lletres     String
  lletres_blue String
  voice_mp3   String
  abecedariId Int
  courses String
}


model Abeced_abc_lletres {
  id          Int      @default(autoincrement()) @id
  voice_mp3   String
  abecedariId Int
  courses String
}
'''