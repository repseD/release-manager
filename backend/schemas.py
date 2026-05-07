from pydantic import BaseModel
from typing import Optional

class TrackBase(BaseModel):
    title: str
    bpm: int
    status: str
    file_path: Optional[str] = None

class TrackCreate(TrackBase):
    pass

class Track(TrackBase):
    id: int

    class Config:
        from_attributes = True