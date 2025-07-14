# SOD/EOD Task Tracker

A full-stack web application for tracking daily tasks with automated Start of Day (SOD) and End of Day (EOD) email reporting system.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Email Templates](#email-templates)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The SOD/EOD Task Tracker is designed to help professionals maintain daily task accountability through systematic tracking and automated email reporting. The application allows users to plan their daily tasks in the morning (SOD) and review their progress in the evening (EOD), with automatic email notifications to supervisors or team leads.

## ✨ Features

### Core Functionality
- **Task Management**: Create, edit, and manage daily tasks
- **Date-based Organization**: Tasks are organized by date for easy tracking
- **Status Tracking**: Mark tasks as pending, completed, or in-progress
- **Automated Email Reports**: Send SOD and EOD updates via email
- **Pending Task Carryover**: Automatically suggest pending tasks from previous day

### SOD (Start of Day) Features
- Add multiple tasks for the day
- Include task descriptions and notes
- Carry over pending tasks from yesterday
- Send formatted SOD email to supervisor
- Clean, intuitive task entry interface

### EOD (End of Day) Features
- Review all tasks for the day
- Update task completion status
- Add unplanned tasks that were completed
- Clear completed tasks from view
- Send comprehensive EOD summary email
- Track completion statistics

### User Experience
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Theme**: Eye-friendly dark color scheme
- **Date Picker**: Easy date selection for task planning
- **Real-time Updates**: Instant task status updates
- **Loading States**: Visual feedback for all operations

## 🛠 Tech Stack

### Frontend
- **React 19**: Modern React with hooks and context
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client for API communication
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server

### Backend
- **Python 3.8+**: Modern Python runtime
- **FastAPI**: High-performance, modern web framework for building APIs
- **PostgreSQL**: Relational database
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping (ORM)
- **Pydantic**: Data validation and settings management
- **smtplib**: Built-in Python email sending library
- **python-dotenv**: Environment variable management
- **psycopg2**: PostgreSQL adapter for Python

### Development Tools
- **ESLint**: Frontend code linting and formatting
- **Uvicorn**: ASGI server for FastAPI
- **Alembic**: Database migration tool for SQLAlchemy

## 📁 Project Structure

```
sod_eod_mail_sender/
├── client/                     # Frontend React application
│   ├── public/
│   │   ├── index.html
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/            # Static assets
│   │   ├── context/           # React context providers
│   │   │   └── DateContext.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── SODInput.jsx   # Start of Day task input
│   │   │   ├── EODReview.jsx  # End of Day task review
│   │   │   └── Summary.jsx    # Task summary (unused)
│   │   ├── App.jsx            # Main application component
│   │   ├── App.css            # Application styles
│   │   ├── index.css          # Global styles
│   │   └── main.jsx           # Application entry point
│   ├── eslint.config.js       # ESLint configuration
│   ├── package.json           # Frontend dependencies
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── vite.config.js         # Vite build configuration
├── server/                    # Backend FastAPI application
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI application entry point
│   │   ├── config/            # Configuration files
│   │   │   ├── __init__.py
│   │   │   ├── database.py    # Database connection
│   │   │   └── settings.py    # Application settings
│   │   ├── models/            # SQLAlchemy models
│   │   │   ├── __init__.py
│   │   │   └── task.py        # Task model
│   │   ├── schemas/           # Pydantic schemas
│   │   │   ├── __init__.py
│   │   │   └── task.py        # Task schemas
│   │   ├── routers/           # API route handlers
│   │   │   ├── __init__.py
│   │   │   ├── tasks.py       # Task endpoints
│   │   │   └── email.py       # Email endpoints
│   │   ├── services/          # Business logic services
│   │   │   ├── __init__.py
│   │   │   ├── task_service.py
│   │   │   └── email_service.py
│   │   └── database/          # Database utilities
│   │       ├── __init__.py
│   │       └── init_db.py     # Database initialization
│   ├── alembic/               # Database migrations
│   │   ├── versions/
│   │   ├── alembic.ini
│   │   └── env.py
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables
│   └── README.md              # Backend documentation
├── docker-compose.yml         # Docker configuration
├── package.json               # Root package.json (for client scripts)
└── README.md                  # Project documentation
```

## 🚀 Installation

### Prerequisites
- Python 3.8 or higher
- Node.js (v16 or higher) for frontend
- PostgreSQL (v12 or higher)
- pip (Python package manager)
- npm or yarn package manager
- Gmail account for email functionality

### 1. Clone the Repository
```bash
git clone <repository-url>
cd sod_eod_mail_sender
```

### 2. Backend Setup (Python FastAPI)
```bash
# Navigate to server directory
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup (React)
```bash
# Navigate to client directory
cd client

# Install frontend dependencies
npm install
cd ..
```

### 4. Database Setup
```bash
# Create PostgreSQL database
createdb sod_eod_tasks

# Run database migrations
cd server
alembic upgrade head
```

### 5. Environment Configuration
Create a `.env` file in the `server` directory:
```env
# Server Configuration
PORT=8000
ENVIRONMENT=development

# Database Configuration
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/sod_eod_tasks
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sod_eod_tasks
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

### 6. Client Configuration
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:8000/api
```

### 7. Gmail App Password Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password for the application
3. Use the App Password in the `EMAIL_PASS` environment variable

## ⚙️ Configuration

### Backend Configuration (FastAPI)
Key configuration options in `server/.env`:
- `PORT`: Server port (default: 8000)
- `DATABASE_URL`: Complete PostgreSQL connection string
- `EMAIL_*`: Gmail SMTP configuration for email sending
- `SECRET_KEY`: JWT secret key for authentication

### Frontend Configuration (React)
The client is configured to connect to the FastAPI backend:
```javascript
// client/.env
VITE_API_URL=http://localhost:8000/api
```

## 🎮 Usage

### Starting the Application

#### Development Mode
```bash
# Start FastAPI backend server
cd server
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Start frontend development server (in new terminal)
cd client
npm run dev
```

#### Production Mode
```bash
# Build frontend
cd client
npm run build

# Start FastAPI backend server
cd server
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Using the Application

#### 1. Start of Day (SOD) Workflow
1. Open the application and select today's date
2. Click "Start of Day (SOD)"
3. Add your planned tasks for the day
4. Include task descriptions if needed
5. If you have pending tasks from yesterday, include them
6. Click "Save & Send Email" to:
   - Save tasks to database
   - Send SOD email to supervisor

#### 2. End of Day (EOD) Workflow
1. Select the appropriate date
2. Click "End of Day (EOD)"
3. Review all tasks for the day
4. Mark tasks as completed by checking the boxes
5. Add any unplanned tasks that were completed
6. Click "Send EOD Email" to:
   - Send comprehensive EOD report
   - Include completion statistics

#### 3. Task Management
- **Adding Tasks**: Use the task input form with optional descriptions
- **Updating Status**: Click checkboxes to mark tasks complete/incomplete
- **Removing Tasks**: Use the delete button (trash icon) to remove tasks
- **Viewing Tasks**: Tasks are automatically loaded based on selected date

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Interactive API Documentation
FastAPI provides automatic interactive API documentation:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Endpoints

#### Tasks

**POST /api/tasks**
- Description: Add new tasks
- Request Body: `{ "tasks": [{"task": "string", "description": "string"}], "type": "sod|eod", "date": "YYYY-MM-DD" }`
- Response: Array of created task objects

**GET /api/tasks/by-date**
- Description: Get tasks for specific date
- Query Parameters: `date` (YYYY-MM-DD format)
- Response: Array of task objects

**PUT /api/tasks/{task_id}**
- Description: Update task status
- Path Parameters: `task_id` (integer)
- Request Body: `{ "status": "pending|completed|in-progress" }`
- Response: Updated task object

**GET /api/tasks/yesterday-pending**
- Description: Get pending tasks from yesterday
- Response: Array of pending task objects

#### Email

**POST /api/email/send-sod**
- Description: Send Start of Day email
- Request Body: `{ "tasks": [{"task": "string", "description": "string"}] }`
- Response: Success message

**POST /api/email/send-eod**
- Description: Send End of Day email
- Request Body: `{ "date": "YYYY-MM-DD" }`
- Response: Success message

### Response Format
```json
{
  "id": 1,
  "task": "Complete project documentation",
  "description": "Write comprehensive README",
  "status": "pending",
  "type": "sod",
  "created_at": "2024-01-15T09:00:00Z",
  "completed_at": null
}
```

## 🗄️ Database Schema

### Tasks Table (SQLAlchemy Model)
```python
class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    task = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(20), default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    type = Column(String(10), default="sod")
```

### Field Descriptions
- `id`: Unique identifier for each task (Primary Key)
- `task`: Task title/name (required, max 255 characters)
- `description`: Optional task description (Text field)
- `status`: Task status (`pending`, `completed`, `in-progress`)
- `created_at`: Timestamp when task was created
- `completed_at`: Timestamp when task was marked complete
- `type`: Task type (`sod` for Start of Day, `eod` for End of Day)

## 📧 Email Templates

### SOD Email Template
```
Respected Sir,

Good morning.

I hope you're doing well.

Planned Tasks for the Day:
- Complete project documentation: Write comprehensive README
- Review code changes: Check pull requests
- Team meeting: Discuss sprint planning

Thank you for your support and guidance.

Best regards,
[Your Name]
[Your ID]
[Department], [Year]
```

### EOD Email Template
```
Respected Sir,

Good evening.

Here is my End of Day (EOD) update for [DATE]

Tasks Completed:
- Complete project documentation: Write comprehensive README
- Review code changes: Check pull requests

Pending:
- Team meeting: Discuss sprint planning

Thank you once again for your continued support.

Best regards,
[Your Name]
[Your ID]
[Department], [Year]
```

## 🔧 Development

### Adding New Features
1. Backend changes go in `server/app/`
2. Database models in `server/app/models/`
3. API routes in `server/app/routers/`
4. Business logic in `server/app/services/`
5. Frontend changes go in `client/src/`
6. Database changes require Alembic migrations

### Code Style
- **Backend**: Follow PEP 8 Python style guide
- **Frontend**: ESLint configuration provided for consistent code style
- Use Prettier for code formatting
- Follow React hooks conventions
- Use async/await for asynchronous operations

### Database Migrations
```bash
# Create new migration
cd server
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

### Testing
- Test API endpoints using FastAPI's automatic documentation at `/docs`
- Verify email functionality with test accounts
- Check responsive design on different screen sizes

## 🚨 Troubleshooting

### Common Issues

**Database Connection Failed**
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure `DATABASE_URL` is correctly formatted
- Verify database exists and is accessible

**FastAPI Server Won't Start**
- Check if virtual environment is activated
- Verify all Python dependencies are installed
- Check for port conflicts (default: 8000)
- Review server logs for detailed error messages

**Email Not Sending**
- Verify Gmail App Password is correct
- Check 2FA is enabled on Gmail account
- Ensure EMAIL_* environment variables are set
- Test SMTP connection manually

**Frontend Not Loading**
- Check if FastAPI server is running on port 8000
- Verify `VITE_API_URL` in client configuration
- Check browser console for errors
- Ensure CORS is properly configured in FastAPI

**Tasks Not Saving**
- Verify database connection
- Check FastAPI server logs for errors
- Ensure all required fields are provided
- Verify database migrations are up to date

## 📈 Future Enhancements

- [ ] User authentication and authorization with JWT
- [ ] Multiple user support
- [ ] Task categories and tags
- [ ] Advanced reporting and analytics
- [ ] Mobile app version
- [ ] Integration with calendar applications
- [ ] Task templates and recurring tasks
- [ ] File attachments for tasks
- [ ] Team collaboration features
- [ ] Real-time notifications with WebSockets
- [ ] API rate limiting and caching
- [ ] Docker containerization
- [ ] Automated testing suite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Set up the development environment
4. Make your changes
5. Add tests for new functionality
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Himanshu Yadav**  
22EJCIT074  
Information Technology, 4th Year  
Email: himanshuyadav.it26@gmail.com

---

**Note**: This application was developed for educational and professional task tracking purposes. The backend is built with Python FastAPI for high performance and modern API development practices. Customize email templates and configuration according to your organizational requirements. 