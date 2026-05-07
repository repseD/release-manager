class TrackRepository:
    def __init__(self):
        self._storage = [
            {"id": 1, "title": "Intro Riff", "bpm": 140, "status": "Idea"},
            {"id": 2, "title": "New Single", "bpm": 125, "status": "Mixing"}
        ]
        self._counter = 3

    def get_all(self):
        return self._storage

    def create(self, track_data):
        new_track = {**track_data.dict(), "id": self._counter}
        self._storage.append(new_track)
        self._counter += 1
        return new_track

    def update_status(self, track_id: int, new_status: str):
        for track in self._storage:
            if track["id"] == track_id:
                track["status"] = new_status
                return track
        return None

    def delete(self, track_id: int):
        self._storage = [t for t in self._storage if t["id"] != track_id]
        return True
    
    def update_bpm(self, track_id: int, new_bpm: int):
        for track in self._storage:
            if track["id"] == track_id:
                track["bpm"] = new_bpm 
                return track
        return None

track_repo = TrackRepository()