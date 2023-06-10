from sqlmodel import SQLModel
from pydantic import EmailStr

class Users(SQLModel):
    user_name:str
    name:str
    email:EmailStr
    country_code:str
    phone:str

    class config:
        orm_mode:True


class CreateUser(Users):
    password:str


class Login(SQLModel):
    user_name:str
    password:str

    class config:
        orm_mode:True



class CreateTasks(SQLModel):
    task:str
    status:str


class Tasks(CreateTasks):
    user_id:str

    class config:
        orm_mode:True


class TaskOuput(CreateTasks):
    task_id:int
class Token(SQLModel):
    access_token:str
    token_type:str
    user_name:str


class TokenData(SQLModel):
    id:int