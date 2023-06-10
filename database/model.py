from database.database_connect import base
from sqlalchemy import Column,Integer,String,ForeignKey

class Users(base):
    __tablename__="userdetails"

    user_name=Column(String,nullable=False,primary_key=True,unique=True)
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
    task_id=Column(Integer,autoincrement=True,primary_key=True,unique=True)
    user_name=Column(String,ForeignKey("userdetails"))
    tasks_to_do=Column(String,nullable=True)
    tasks_in_progress=Column(String,nullable=True)
    tasks_completed=Column(String,nullable=True)

    class config:
        orm_mode:True