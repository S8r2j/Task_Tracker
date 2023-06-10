from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
# for loading the secret credentials
from ..core.config import settings

password=settings.DATABASE_PASSWORD
host=settings.DATABASE_HOST
user=settings.DATABASE_USER
database=settings.DATABASE_NAME
port=settings.DATABASE_PORT
database_url=f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{database}"

engine= create_engine(database_url,pool_pre_ping=True)
session= sessionmaker(autocommit=False,autoflush=False,bind=engine)
base=declarative_base()

def get_database():
    database = session()
    try:
        yield database
    except:
        database.close()