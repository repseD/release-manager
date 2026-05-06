import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

export const trackApi = {
    getTracks: () => instance.get('/tracks'),
    createTrack: (data) => instance.post('/tracks', data),
    updateStatus: (id, status) => instance.patch(`/tracks/${id}?status=${status}`),
    deleteTrack: (id) => instance.delete(`/tracks/${id}`),
    updateBpm: (id, bpm) => instance.patch(`/tracks/${id}/bpm?bpm=${bpm}`),
};