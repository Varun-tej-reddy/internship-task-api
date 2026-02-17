# Internship Backend Project (FastAPI + MySQL)

This project includes:
- User registration with hashed password (bcrypt)
- Login with JWT token
- Role-based access (`admin`, `user`)
- Task CRUD APIs
- FastAPI Swagger docs
- Basic frontend pages for auth and task actions

## Project Structure

```
backend-project/
├── app/
│   ├── main.py
│   ├── database/
│   │   └── connection.py
│   ├── models/
│   │   ├── user.py
│   │   └── task.py
│   ├── schemas/
│   │   ├── user_schema.py
│   │   └── task_schema.py
│   ├── routes/
│   │   ├── auth.py
│   │   └── tasks.py
│   └── utils/
│       └── auth_utils.py
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   └── script.js
├── requirements.txt
└── README.md
```

## Setup

1. Create MySQL database:
   ```sql
   CREATE DATABASE internship_db;
   ```

2. Update DB credentials in:
   - `app/database/connection.py`

3. Create virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate    # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. Run server:
   ```bash
   uvicorn app.main:app --reload
   ```

5. Open docs:
   - Swagger UI: http://127.0.0.1:8000/docs
   - ReDoc: http://127.0.0.1:8000/redoc

## API Summary

- `POST /auth/register` - register user
- `POST /auth/login` - login and get JWT token
- `POST /tasks/` - create task (authenticated)
- `GET /tasks/` - list tasks (admin sees all, user sees own)
- `GET /tasks/{task_id}` - get task by id
- `PUT /tasks/{task_id}` - update task
- `DELETE /tasks/{task_id}` - delete task
- `GET /tasks/admin/all` - admin-only list of all tasks

## Frontend

Open `frontend/index.html` in browser for basic register/login flow.
