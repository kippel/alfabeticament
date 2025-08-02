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

