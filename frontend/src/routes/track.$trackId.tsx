import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { trackApi } from '../api/api';
import { Track } from '../api/types';
import { FileText, Guitar, Save } from 'lucide-react';
import styles from '../App.module.css';

export const Route = createFileRoute('/track/$trackId')({
  component: TrackDetailsPage,
});

function TrackDetailsPage() {
  const { trackId } = Route.useParams();
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    trackApi.getTracks().then((tracks) => {
      const found = tracks.find((t) => t.id === Number(trackId));
      setTrack(found || null);
      setLoading(false);
    });
  }, [trackId]);

  if (loading) return <div className={styles.loadingState}>Loading details...</div>;
  if (!track) return <div className={styles.errorBanner}>Track not found</div>;

  return (
    <div className={styles.detailsPage}>
      <h2 className={styles.title}>{track.title}</h2>

      <div className={styles.detailsGrid}>
        {/* Секция с описанием или текстом */}
        <div className={styles.detailsCard}>
          <div className={styles.cardHeader}>
            <FileText size={20} />
            <span>Lyrics / Notes</span>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Write lyrics or song structure here..."
          />
        </div>

        {/* Секция с инструментами */}
        <div className={styles.detailsCard}>
          <div className={styles.cardHeader}>
            <Guitar size={20} />
            <span>Instruments / Gear</span>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="E.g. Gibson Explorer, Neural DSP Nameless..."
          />
        </div>
      </div>

      <button className={styles.addButton} style={{ marginTop: '2rem' }}>
        <Save size={20} />
        Save Details
      </button>
    </div>
  );
}
