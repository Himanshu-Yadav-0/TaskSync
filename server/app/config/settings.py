try:
    from pydantic_settings import BaseSettings
except ImportError:
    from pydantic import BaseSettings
import os

class Settings(BaseSettings):
    # Server Configuration
    port: int = 5000
    environment: str = "development"
    
    # Database Configuration
    database_url: str = ""  # Add this field since it's in .env
    db_host: str = "localhost"
    db_port: int = 5432
    db_name: str = "sod_eod_tasks"
    db_user: str = "postgres"
    db_password: str = ""
    
    # Email Configuration
    email_user: str = ""
    email_pass: str = ""
    email_to: str = ""
    email_from: str = ""
    smtp_server: str = "smtp.gmail.com"
    smtp_port: int = 587
    
    # Security
    secret_key: str = "your-secret-key-here"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    @property
    def computed_database_url(self) -> str:
        # Use DATABASE_URL if provided, otherwise construct from individual components
        if self.database_url:
            return self.database_url
        return f"postgresql://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_name}"
    
    model_config = {
        'env_file': '.env',
        'extra': 'ignore'  # Allow extra fields from .env
    }

settings = Settings() 