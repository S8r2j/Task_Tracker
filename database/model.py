from database.database_connect import base
from sqlalchemy import Column,Integer,String,ForeignKey

class Users(base):
    __tablename__="userdetails"

    user_id=Column(Integer,autoincrement=True,primary_key=True)
    user_name=Column(String,nullable=False,unique=True)
    name=Column(String,nullable=False)
    email=Column(String,nullable=False,unique=True)
    country_code=Column(String,nullable=False)
    phone=Column(String,nullable=False)

    class config:
        orm_mode:True

class Login(base):
    __tablename__="login"
    id=Column(Integer,autoincrement=True,primary_key=True)
    user_name=Column(String,ForeignKey("userdetails"))
    password=Column(String,nullable=False)

    class config:
        orm_mode:True


class Tasks(base):
    __tablename__="tasks"

    user_id=Column(Integer,ForeignKey("userdetails"))
    task_id=Column(Integer,autoincrement=True,primary_key=True,unique=True)
    task=Column(String,nullable=False)
    status=Column(String)

    class config:
        orm_mode:True