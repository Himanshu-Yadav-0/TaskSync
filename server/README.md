# SOD/EOD Task Tracker - Python FastAPI Backend

This is the backend API for the SOD/EOD Task Tracker application, built with Python FastAPI, SQLAlchemy, and PostgreSQL.

## 🛠 Tech Stack

- **Python 3.8+**: Modern Python runtime
- **FastAPI**: High-performance, modern web framework for building APIs
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping (ORM)
- **PostgreSQL**: Relational database
- **Pydantic**: Data validation and settings management
- **Alembic**: Database migration tool
- **psycopg2**: PostgreSQL adapter for Python
- **smtplib**: Built-in Python email sending library

## 📁 Project Structure

```
server/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   ├── config/                 # Configuration files
│   │   ├── __init__.py
│   │   ├── database.py         # Database connection
│   │   └── settings.py         # Application settings
│   ├── models/                 # SQLAlchemy models
│   │   ├── __init__.py
│   │   └── task.py             # Task model
│   ├── schemas/                # Pydantic schemas
│   │   ├── __init__.py
│   │   └── task.py             # Task schemas
│   ├── routers/                # API route handlers
│   │   ├── __init__.py
│   │   ├── tasks.py            # Task endpoints
│   │   └── email.py            # Email endpoints
│   ├── services/               # Business logic services
│   │   ├── __init__.py
│   │   ├── task_service.py     # Task business logic
│   │   └── email_service.py    # Email service
│   └── database/               # Database utilities
│       ├── __init__.py
│       └── init_db.py          # Database initialization
├── alembic/                    # Database migrations
│   ├── versions/
│   ├── alembic.ini
│   └── env.py
├── requirements.txt            # Python dependencies
├── .env                        # Environment variables
└── README.md                   # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- PostgreSQL (v12 or higher)
- pip (Python package manager)
- Gmail account for email functionality

### 1. Setup Virtual Environment
```bash
cd server
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Database Setup
Create a PostgreSQL database:
```bash
createdb sod_eod_tasks
```

### 4. Environment Configuration
Ensure your `.env` file has the correct configuration:
```env
# Server Configuration
PORT=5000
ENVIRONMENT=development

# Database Configuration
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/taskemaildb
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskemaildb
DB_USER=postgres
DB_PASSWORD=your_password

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=supervisor@company.com
EMAIL_FROM=your-email@gmail.com
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 5. Database Migrations
```bash
# Initialize Alembic (if not already done)
alembic init alembic

# Create initial migration
alembic revision --autogenerate -m "Initial migration"

# Apply migrations
alembic upgrade head
```

## 🎮 Usage

### Starting the Server

#### Development Mode
```bash
uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload
```

#### Production Mode
```bash
uvicorn app.main:app --host 0.0.0.0 --port 5000
```

### API Documentation
FastAPI provides automatic interactive API documentation:
- **Swagger UI**: `http://localhost:5000/docs`
- **ReDoc**: `http://localhost:5000/redoc`

## 📡 API Endpoints

### Tasks
- `POST /api/tasks` - Create multiple tasks
- `GET /api/tasks/by-date?date=YYYY-MM-DD` - Get tasks for specific date
- `PUT /api/tasks/{task_id}` - Update task status
- `GET /api/tasks/yesterday-pending` - Get pending tasks from yesterday
- `GET /api/tasks/{task_id}` - Get single task by ID
- `DELETE /api/tasks/{task_id}` - Delete task by ID

### Email
- `POST /api/send-sod-email` - Send Start of Day email
- `POST /api/send-eod-email` - Send End of Day email

## 🗄️ Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    type VARCHAR(10) DEFAULT 'sod'
);
```

## 🔧 Development

### Adding New Features
1. Models go in `app/models/`
2. Schemas go in `app/schemas/`
3. Business logic goes in `app/services/`
4. API routes go in `app/routers/`
5. Database changes require Alembic migrations

### Database Migrations
```bash
# Create new migration
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

### Testing the API
Use the automatic documentation at `http://localhost:5000/docs` to test endpoints interactively.

## 🚨 Troubleshooting

### Common Issues

**Import Errors**
- Ensure virtual environment is activated
- Check all dependencies are installed: `pip install -r requirements.txt`

**Database Connection Issues**
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists: `createdb sod_eod_tasks`

**Email Not Sending**
- Verify Gmail App Password is correct
- Check 2FA is enabled on Gmail account
- Ensure EMAIL_* environment variables are set correctly

**Migration Issues**
- Check Alembic configuration in `alembic.ini`
- Ensure database URL is correct in `alembic/env.py`
- Run `alembic upgrade head` to apply pending migrations

## 📈 API Features

- **Automatic Documentation**: Swagger UI and ReDoc
- **Data Validation**: Pydantic schemas for request/response validation
- **Error Handling**: Comprehensive error responses
- **CORS Support**: Configured for frontend integration
- **Database Migrations**: Alembic for version control
- **Environment Configuration**: Flexible settings management

## 🤝 Contributing

1. Follow PEP 8 Python style guide
2. Add type hints to all functions
3. Write docstrings for all public methods
4. Create database migrations for schema changes
5. Test endpoints using FastAPI docs interface

---

**Note**: This FastAPI backend provides a modern, high-performance API for the SOD/EOD Task Tracker application with automatic documentation, data validation, and robust error handling. 