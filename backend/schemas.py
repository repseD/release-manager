from pydantic import BaseModel
from typing import Optional

# Базовая схема данных
class TrackBase(BaseModel):
    title: str
    bpm: int
    status: str

class TrackCreate(TrackBase):
    pass

class Track(TrackBase):
    id: int

    class Config:
        from_attributes = True