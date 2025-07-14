import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from typing import List
from app.config.settings import settings
from app.schemas.task import TaskCreate
from app.models.task import Task

class EmailService:
    
    # Email templates
    SOD_TEMPLATE = """
Respected Sir,

Good morning.

I hope you're doing well.

Planned Tasks for the Day:
{tasks}

Thank you for your support and guidance.

Best regards,  
Himanshu Yadav  
22EJCIT074
Information Technology, 4th Year
"""

    EOD_TEMPLATE = """
Respected Sir,

Good evening.

Here is my End of Day (EOD) update for {date}

Tasks Completed:
{completed_tasks}

Pending:
{pending_tasks}

Thank you once again for your continued support.

Best regards,  
Himanshu Yadav  
22EJCIT074
Information Technology, 4th Year
"""

    @staticmethod
    def _create_smtp_connection():
        """Create SMTP connection to Gmail"""
        try:
            server = smtplib.SMTP(settings.smtp_server, settings.smtp_port)
            server.starttls()
            server.login(settings.email_user, settings.email_pass)
            return server
        except Exception as e:
            print(f"Error creating SMTP connection: {e}")
            raise
    
    @staticmethod
    def _format_task_list(tasks: List[TaskCreate]) -> str:
        """Format task list for email"""
        if not tasks:
            return "- None"
        
        formatted_tasks = []
        for task in tasks:
            task_line = f"- {task.task}"
            if task.description:
                task_line += f": {task.description}"
            formatted_tasks.append(task_line)
        
        return "\n".join(formatted_tasks)
    
    @staticmethod
    def _format_task_list_from_db(tasks: List[Task]) -> str:
        """Format task list from database models for email"""
        if not tasks:
            return "- None"
        
        formatted_tasks = []
        for task in tasks:
            task_line = f"- {task.task}"
            if task.description:
                task_line += f": {task.description}"
            formatted_tasks.append(task_line)
        
        return "\n".join(formatted_tasks)
    
    @staticmethod
    def send_sod_email(tasks: List[TaskCreate]) -> bool:
        """Send Start of Day email"""
        try:
            # Format email content
            tasks_formatted = EmailService._format_task_list(tasks)
            email_body = EmailService.SOD_TEMPLATE.format(tasks=tasks_formatted)
            
            # Create email
            msg = MIMEMultipart()
            msg['From'] = settings.email_from
            msg['To'] = settings.email_to
            msg['Subject'] = f"SOD Update – Himanshu Yadav – {datetime.now().strftime('%Y-%m-%d')}"
            
            msg.attach(MIMEText(email_body, 'plain'))
            
            # Send email
            server = EmailService._create_smtp_connection()
            text = msg.as_string()
            server.sendmail(settings.email_from, settings.email_to, text)
            server.quit()
            
            print(f"SOD email sent successfully to {settings.email_to}")
            return True
            
        except Exception as e:
            print(f"Error sending SOD email: {e}")
            return False
    
    @staticmethod
    def send_eod_email(tasks: List[Task], date_str: str = None) -> bool:
        """Send End of Day email"""
        try:
            # Separate completed and pending tasks
            completed_tasks = [task for task in tasks if task.status == "completed"]
            pending_tasks = [task for task in tasks if task.status != "completed"]
            
            # Format task lists
            completed_formatted = EmailService._format_task_list_from_db(completed_tasks)
            pending_formatted = EmailService._format_task_list_from_db(pending_tasks)
            
            # Use provided date or current date
            email_date = date_str if date_str else datetime.now().strftime('%Y-%m-%d')
            
            # Format email content
            email_body = EmailService.EOD_TEMPLATE.format(
                date=email_date,
                completed_tasks=completed_formatted,
                pending_tasks=pending_formatted
            )
            
            # Create email
            msg = MIMEMultipart()
            msg['From'] = settings.email_from
            msg['To'] = settings.email_to
            msg['Subject'] = f"EOD Update – Himanshu Yadav – {email_date}"
            
            msg.attach(MIMEText(email_body, 'plain'))
            
            # Send email
            server = EmailService._create_smtp_connection()
            text = msg.as_string()
            server.sendmail(settings.email_from, settings.email_to, text)
            server.quit()
            
            print(f"EOD email sent successfully to {settings.email_to}")
            return True
            
        except Exception as e:
            print(f"Error sending EOD email: {e}")
            return False 