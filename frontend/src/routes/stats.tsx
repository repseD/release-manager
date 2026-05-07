import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { trackApi } from '../api/api';
import { Track } from '../api/types';
import styles from '../App.module.css';

export const Route = createFileRoute('/stats')({
  component: StatsPage,
});

function StatsPage() {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    trackApi.getTracks().then(setTracks);
  }, []);

  const stats = {
    Idea: tracks.filter((t) => t.status === 'Idea').length,
    Recording: tracks.filter((t) => t.status === 'Recording').length,
    Mixing: tracks.filter((t) => t.status === 'Mixing').length,
    Mastered: tracks.filter((t) => t.status === 'Mastered').length,
  };

  return (
    <div className={styles.trackList}>
      <h2 className={styles.statsTitle}>Production Statistics</h2>
      <div className={styles.statsGrid}>
        {Object.entries(stats).map(([status, count]) => (
          <div key={status} className={styles.statCard}>
            <span className={styles.statLabel}>{status}</span>
            <span className={styles.statValue}>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
