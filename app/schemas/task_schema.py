from typing import Optional

from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    status: str = Field(default="pending", regex="^(pending|in_progress|completed)$")


class TaskUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    description: Optional[str] = None
    status: Optional[str] = Field(default=None, regex="^(pending|in_progress|completed)$")


class TaskOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    status: str
    owner_id: int

    class Config:
        orm_mode = True
