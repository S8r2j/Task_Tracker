from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_PASSWORD:str
    POSTGRES_PASSWORD:str
    DATABASE_HOST:str
    DATABASE_USER:str
    DATABASE_NAME:str
    DATABASE_PORT:str
    ALGORITHM:str
    SECRET_KEY:str
    TOKEN_EXPIRY_LIMIT:int

    class Config:
        env_file = './.env'

settings=Settings()