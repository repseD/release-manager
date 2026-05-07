import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useTrackStore } from '../store/useTrackStore';
import { TrackCard } from '../components/TrackCard';
import { PlusCircle } from 'lucide-react';
import styles from '../App.module.css';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

function IndexPage() {
  const { tracks, isLoading, error, fetchTracks, addTrack, deleteTrack, updateStatus, updateBpm } =
    useTrackStore();

  const [newTitle, setNewTitle] = useState<string>('');
  const [newFilePath, setNewFilePath] = useState<string>('');

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    await addTrack({
      title: newTitle,
      bpm: 120,
      status: 'Idea',
      file_path: newFilePath.trim() || undefined,
    });

    setNewTitle('');
    setNewFilePath('');
  };

  return (
    <div className={styles.pageContent}>
      {/* Форма добавления */}
      <form onSubmit={handleSubmit} className={styles.addForm}>
        <input
          className={styles.input}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New track title (e.g. Heavy Riff)..."
        />

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

      {/* Индикация ошибок из стора */}
      {error && <div className={styles.errorBanner}>{error}</div>}

      {/* Список треков */}
      <div className={styles.trackList}>
        {isLoading ? (
          <div className={styles.loadingState}>Loading tracks...</div>
        ) : tracks.length === 0 ? (
          <div className={styles.emptyState}>No tracks found. Start by adding one!</div>
        ) : (
          tracks.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              onDelete={deleteTrack}
              onUpdate={updateStatus}
              onUpdateBpm={updateBpm}
            />
          ))
        )}
      </div>
    </div>
  );
}
