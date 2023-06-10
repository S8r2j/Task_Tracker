from fastapi.security.oauth2 import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import timedelta, datetime
import json
from database import schemas
from .config import settings
from passlib.context import CryptContext

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

auth_scheme = OAuth2PasswordBearer(tokenUrl="/user/login/")
# SECRET_KEY and ALGORITHM is used for creating the access token
# Add the secret key to your env file in the format : "SECRET_KEY":"your_secret_key"
SECRET_KEY = settings.SECRET_KEY
ALGORITHM =settings.ALGORITHM

# TOKEN_EXPIRY is the expiry time of the access token that is created
TOKEN_EXPIRY_MINUTES = settings.TOKEN_EXPIRY_LIMIT

def create_access_token(data: dict):
    # copying the original data to another variable to create access token from it
    data_encode = data.copy()

    # starting the expiring time of the access token
    expire = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRY_MINUTES)

    # appending the expression of expiring time to data_encode variable
    data_encode.update({"expiry time": json.dumps(expire, default=str)})

    # encoding the data to convert in jwt i.e access token
    access_token = jwt.encode(data_encode, SECRET_KEY, algorithm=ALGORITHM)
    return access_token




def verify_access_token(token: str, credentials_exception):
    try:
        # decoding the access token to retrieve the decoded dictionary from it
        data_decode = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        # getting the username that is encoded in access token and storing in user_name
        id: int = data_decode.get("id")

        if not id:
            raise credentials_exception
        token_data = schemas.TokenData(id=id)
    except JWTError:
        raise credentials_exception
    return token_data.id






# for returning the hash password

def get_hash_password(password: str):
    return password_context.hash(password)


# for verifying the password

def verify_password(plain_pwd, hash_pwd):
    return password_context.verify(plain_pwd, hash_pwd)