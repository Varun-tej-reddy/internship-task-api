from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import Base, engine
from app.routes.auth import router as auth_router
from app.routes.tasks import router as tasks_router

# Create DB tables on startup (for assignment simplicity)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Internship User Registration & Task API",
    description="FastAPI backend with MySQL, JWT auth, RBAC, and Task CRUD",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"message": "API is running"}


app.include_router(auth_router)
app.include_router(tasks_router)
