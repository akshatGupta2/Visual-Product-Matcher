from os import getenv
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = 'caa4666641a41891d231c5dc39174e24'
    SQLALCHEMY_DATABASE_URI = getenv("DATABASE_URL")
        
    def __init__(self):
        if not self.SQLALCHEMY_DATABASE_URI:
            raise ValueError("DataBase URL not provided")
        else:
            print(self.SQLALCHEMY_DATABASE_URI)