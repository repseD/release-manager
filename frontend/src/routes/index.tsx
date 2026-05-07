import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { trackApi } from '../api/api';
import { Track, TrackStatus } from '../api/types';
import { TrackCard } from '../components/TrackCard';
import { PlusCircle } from 'lucide-react';
import styles from '../App.module.css';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newFilePath, setNewFilePath] = useState<string>(''); 
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadTracks = async () => {
    setIsLoading(true);
    try {
      const data = await trackApi.getTracks();
      setTracks(data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить треки. Проверьте соединение с сервером.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTracks();
  }, []);

  const addTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      await trackApi.createTrack({ 
        title: newTitle, 
        bpm: 120, 
        status: 'Idea',
        file_path: newFilePath.trim() || undefined // Если пусто, шлем undefined
      });
      
      setNewTitle('');
      setNewFilePath(''); // Очищаем поле файла
      await loadTracks();
    } catch (err) {
      setError('Ошибка при создании трека');
    }
  };

  const handleUpdateStatus = async (id: number, status: TrackStatus) => {
    try {
      await trackApi.updateStatus(id, status);
      await loadTracks();
    } catch (err) {
      setError('Не удалось обновить статус');
    }
  };

  const handleUpdateBpm = async (id: number, bpm: number) => {
    try {
      await trackApi.updateBpm(id, bpm);
      await loadTracks();
    } catch (err) {
      setError('Не удалось обновить BPM');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await trackApi.deleteTrack(id);
      await loadTracks();
    } catch (err) {
      setError('Ошибка при удалении');
    }
  };

  return (
    <div className={styles.pageContent}>
      <form onSubmit={addTrack} className={styles.addForm}>
        {/* Инпут для названия */}
        <input 
          className={styles.input}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New track title (e.g. Heavy Riff)..."
        />
        
        {/* --- НОВОЕ: Инпут для имени аудиофайла --- */}
        <input 
          className={styles.input}
          value={newFilePath}
          onChange={(e) => setNewFilePath(e.target.value)}
          placeholder="Audio file name (e.g. demo.mp3)..."
        />

        <button type="submit" className={styles.addButton}>
          <PlusCircle size={20} />
          Add Track
        </button>
      </form>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <div className={styles.trackList}>
        {isLoading ? (
          <div className={styles.loadingState}>Loading tracks...</div>
        ) : tracks.length === 0 ? (
          <div className={styles.emptyState}>No tracks found. Start by adding one!</div>
        ) : (
          tracks.map(track => (
            <TrackCard 
              key={track.id} 
              track={track} 
              onDelete={handleDelete}
              onUpdate={handleUpdateStatus}
              onUpdateBpm={handleUpdateBpm}
            />
          ))
        )}
      </div>
    </div>
  );
}