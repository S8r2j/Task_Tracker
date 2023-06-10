from fastapi import Depends,HTTPException,status
from sqlalchemy.orm import Session
import sys
from pathlib import Path
file = Path(__file__).resolve()
parent, root = file.parent, file.parents[2]
sys.path.append(str(root))

# Additionally remove the current file's directory from sys.path
try:
    sys.path.remove(str(parent))
except ValueError: # Already removed
    pass

from database import database_connect,model
from .security import verify_access_token,auth_scheme


def get_database():
    db=database_connect.session()
    try:
        yield db
    finally:
        db.close()




def get_current_user(token: str = Depends(auth_scheme), db: Session = Depends(get_database)):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalidate Credentials",
                                          headers={"WWW-Authenticate": "Bearer"})
    token = verify_access_token(token, credentials_exception)
    login_details = db.query(model.Login).filter(model.Login.id == token).first()
    user = db.query(model.Users).filter(model.Users.user_name == login_details.user_name).first()
    return user