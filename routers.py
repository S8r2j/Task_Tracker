from fastapi import APIRouter,HTTPException,status,Depends
from database import model,database_connect,schemas
from core import deps,security
from sqlalchemy.orm import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm


router=APIRouter()

model.base.metadata.create_all(bind=database_connect.engine)

@router.post("/create/user/")
async def create_user(user:schemas.CreateUser,db:Session=Depends(deps.get_database)):
    users=db.query(model.Users).filter(model.Users.user_name==user.user_name).first()
    if users:
       raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail="username is not available")
    users=db.query(model.Users).filter(model.Users.email==user.email).first()
    if users:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
    users=model.Users(user_name=user.user_name,phone=user.phone,email=user.email,name=user.name,country_code=user.country_code)
    db.add(users)
    db.commit()
    db.refresh(users)
    login_details=model.Login(user_name=user.user_name,password=security.get_hash_password(user.password))
    db.add(login_details)
    db.commit()
    db.refresh(login_details)
    return "User created"


@router.post("/user/login/",response_model=schemas.Token)
async def user_login(credentials:OAuth2PasswordRequestForm=Depends(),db:Session=Depends(deps.get_database)):
    user = db.query(model.Users).filter(model.Users.user_name == credentials.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Please signup before logging in")

    login_details = db.query(model.Login).filter(model.Login.user_name == credentials.username).first()
    if not login_details:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Login details not found")

    if not security.verify_password(credentials.password, login_details.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid credentials")

    access_token = security.create_access_token(data={"id": login_details.id})
    return {"access_token": access_token, "token_type": "bearer", "user_name": credentials.username}


@router.patch("/add/tasks/",dependencies=[Depends(deps.get_current_user)])
def add_tasks(tasks:schemas.CreateTasks,user:model.Users=Depends(deps.get_current_user),db:Session=Depends(deps.get_database)):
    user=db.query(model.Users).filter(model.Users.user_name==user.user_name).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized access")
