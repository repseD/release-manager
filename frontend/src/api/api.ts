// src/api/api.ts
import { Track, TrackStatus, CreateTrackDto } from './types';

const BASE_URL = 'http://127.0.0.1:8000';

export const trackApi = {
    async getTracks(): Promise<Track[]> {
        const response = await fetch(`${BASE_URL}/tracks`);
        if (!response.ok) throw new Error('Failed to fetch tracks');
        return response.json();
    },

    async createTrack(data: CreateTrackDto): Promise<Track> {
        const response = await fetch(`${BASE_URL}/tracks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create track');
        return response.json();
    },

    async updateStatus(id: number, status: TrackStatus): Promise<Track> {
        const response = await fetch(`${BASE_URL}/tracks/${id}/status?status=${status}`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Failed to update status');
        return response.json();
    },

    async updateBpm(id: number, bpm: number): Promise<Track> {
        const response = await fetch(`${BASE_URL}/tracks/${id}/bpm?bpm=${bpm}`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Failed to update BPM');
        return response.json();
    },

    async deleteTrack(id: number): Promise<void> {
        const response = await fetch(`${BASE_URL}/tracks/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete track');
    }
};