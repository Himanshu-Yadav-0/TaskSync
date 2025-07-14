from sqlalchemy import create_engine
from app.config.database import Base, DATABASE_URL
from app.models.task import Task

def init_database():
    """Initialize database with tables"""
    try:
        engine = create_engine(DATABASE_URL)
        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully")
        return True
    except Exception as e:
        print(f"Error initializing database: {e}")
        return False

if __name__ == "__main__":
    init_database() 