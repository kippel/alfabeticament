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

###############################################################
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
  courses = Column(String)

###########################################################
class AbcBar(Base):
  __tablename__ = "abc_bar"
  id = Column(Integer, primary_key=True, index=True)    

  title = Column(String)
  name = Column(String)
  courses = Column(String)

class AbcList(Base):
  __tablename__ = "abc_list"
  id = Column(Integer, primary_key=True, index=True) 

  abc_id = Column(Integer)
  courses = Column(String) 
  title = Column(String) 

class AbcUn(Base):
  __tablename__ = "abc_un"
  id = Column(Integer, primary_key=True, index=True) 

  abc_un_id = Column(Integer)
  nom = Column(String)
  number = Column(Integer)
  number_bar = Column(Integer)
  courses = Column(String)
  
class AbcDos(Base):
  __tablename__ = "abc_dos"
  id = Column(Integer, primary_key=True, index=True) 

  
  abc_dos_id = Column(Integer)
  lletres = Column(String)
  voice_mp3 = Column(String)
  vocals_images = Column(String)
  number = Column(Integer)
  number_bar = Column(Integer)
  courses = Column(String)   
          