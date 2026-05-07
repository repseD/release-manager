export type TrackStatus = 'Idea' | 'Recording' | 'Mixing' | 'Mastered';

export interface Track {
  id: number;
  title: string;
  bpm: number;
  status: TrackStatus;
  file_path?: string;
}

export interface CreateTrackDto {
  title: string;
  bpm: number;
  status: TrackStatus;
  file_path?: string;
}