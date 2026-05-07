import { useState, useEffect } from 'react';
import { trackApi } from './api/api';
import { Track, TrackStatus } from './api/types';
import { TrackCard } from './components/TrackCard';
import { Music, PlusCircle } from 'lucide-react';
import styles from './App.module.css';

function App() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadTracks = async () => {
    setIsLoading(true);
    try {
      const data = await trackApi.getTracks();
      setTracks(data);
      setError(null);
    } catch (err) {
      setError('Не удалось загрузить треки. Проверьте, запущен ли бэкенд.');
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
      await trackApi.createTrack({ title: newTitle, bpm: 120, status: 'Idea' });
      setNewTitle('');
      await loadTracks();
    } catch (err) {
      setError('Ошибка при добавлении трека');
    }
  };

  const handleUpdate = async (id: number, status: TrackStatus) => {
    try {
      await trackApi.updateStatus(id, status);
      await loadTracks();
    } catch (err) {
      setError('Ошибка обновления статуса');
    }
  };

  const handleUpdateBpm = async (id: number, bpm: number) => {
    try {
      await trackApi.updateBpm(id, bpm);
      await loadTracks();
    } catch (err) {
      setError('Ошибка обновления BPM');
    }
  };

  // 5. Удаление трека (корзина)
  const handleDelete = async (id: number) => {
    try {
      await trackApi.deleteTrack(id);
      await loadTracks();
    } catch (err) {
      setError('Ошибка при удалении трека');
    }
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <div className={styles.logoArea}>
          <Music className="text-purple-500" size={32} />
          <h1 className={styles.logoText}>BandManager</h1>
        </div>
      </header>

      <form onSubmit={addTrack} className={styles.addForm}>
        <input 
          className={styles.input}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New track title..."
        />
        <button type="submit" className={styles.addButton}>
          <PlusCircle size={20} />
          Add Track
        </button>
      </form>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <main className={styles.trackList}>
        {isLoading ? (
          <p style={{ textAlign: 'center', color: '#64748b' }}>Loading...</p>
        ) : (
          tracks.map(track => (
            <TrackCard 
              key={track.id} 
              track={track} 
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onUpdateBpm={handleUpdateBpm}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default App;