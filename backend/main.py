from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import Track, TrackCreate
from repository import track_repo

app = FastAPI(title="Band Release Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/tracks", response_model=list[Track])
def read_tracks():
    return track_repo.get_all()

@app.post("/tracks", response_model=Track)
def create_track(track: TrackCreate):
    return track_repo.create(track)

@app.patch("/tracks/{track_id}")
def update_track_status(track_id: int, status: str):
    updated = track_repo.update_status(track_id, status)
    if not updated:
        raise HTTPException(status_code=404, detail="Track not found")
    return updated

@app.delete("/tracks/{track_id}")
def delete_track(track_id: int):
    track_repo.delete(track_id)
    return {"message": "Deleted successfully"}

@app.patch("/tracks/{track_id}/bpm", response_model=Track)
def update_track_bpm(track_id: int, bpm: int): # <--- Имя переменной должно быть bpm!
    updated = track_repo.update_bpm(track_id, bpm)
    if not updated:
        raise HTTPException(status_code=404, detail="Track not found")
    return updated

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)