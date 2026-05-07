import { create } from 'zustand';
import { Track, TrackStatus, CreateTrackDto } from '../api/types';
import { trackApi } from '../api/api';

interface TrackState {
  tracks: Track[];
  isLoading: boolean;
  error: string | null;
  
  // Экшены
  fetchTracks: () => Promise<void>;
  addTrack: (data: CreateTrackDto) => Promise<void>;
  deleteTrack: (id: number) => Promise<void>;
  updateStatus: (id: number, status: TrackStatus) => Promise<void>;
  updateBpm: (id: number, bpm: number) => Promise<void>;
  updateLyrics: (id: number, lyrics: string) => Promise<void>;
}

export const useTrackStore = create<TrackState>((set, get) => ({
  tracks: [],
  isLoading: false,
  error: null,

  fetchTracks: async () => {
    set({ isLoading: true });
    try {
      const data = await trackApi.getTracks();
      set({ tracks: data, error: null });
    } catch (err) {
      set({ error: 'Failed to load tracks' });
    } finally {
      set({ isLoading: false });
    }
  },

  addTrack: async (data) => {
    try {
      await trackApi.createTrack(data);
      await get().fetchTracks(); 
    } catch (err) {
      set({ error: 'Failed to add track' });
    }
  },

  deleteTrack: async (id) => {
    try {
      await trackApi.deleteTrack(id);
      set((state) => ({
        tracks: state.tracks.filter((t) => t.id !== id),
      }));
    } catch (err) {
      set({ error: 'Failed to delete track' });
    }
  },

  updateStatus: async (id, status) => {
    try {
      await trackApi.updateStatus(id, status);
      // рефетч
      await get().fetchTracks();
    } catch (err) {
      set({ error: 'Failed to update status' });
    }
  },

  updateBpm: async (id, bpm) => {
    try {
      await trackApi.updateBpm(id, bpm);
      await get().fetchTracks();
    } catch (err) {
      set({ error: 'Failed to update BPM' });
    }
  },

    updateLyrics: async (id, lyrics) => {
        try {
            await trackApi.updateLyrics(id, lyrics);
            set((state) => ({
                tracks: state.tracks.map((t) => 
                    t.id === id ? { ...t, lyrics } : t
                ),
            }));
        } catch (err) {
            set({ error: 'Не удалось сохранить текст' });
        }
    },

}));