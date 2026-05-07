import { Trash2, ChevronRight, ChevronLeft, Edit2, Zap, Music } from 'lucide-react';
import styles from './TrackCard.module.css';
import { Track, TrackStatus } from '../api/types';
import { Link } from '@tanstack/react-router';

interface TrackCardProps {
    track: Track;
    onDelete: (id: number) => void;
    onUpdate: (id: number, status: TrackStatus) => void;
    onUpdateBpm: (id: number, bpm: number) => void;
}

export const TrackCard = ({ track, onDelete, onUpdate, onUpdateBpm }: TrackCardProps) => {
    // Отладка: удали после проверки. Позволит увидеть, пришел ли путь к файлу.
    console.log(`Track: ${track.title}, File: ${track.file_path}`);

    const statuses: TrackStatus[] = ['Idea', 'Recording', 'Mixing', 'Mastered'];
    
    const handleEditBpm = () => {
        const newBpm = prompt(`Enter new BPM for ${track.title}:`, track.bpm.toString());
        if (newBpm !== null && !isNaN(Number(newBpm)) && newBpm !== "") {
            onUpdateBpm(track.id, parseInt(newBpm));
        }
    };

    const nextStatus = () => {
        const currentIndex = statuses.indexOf(track.status);
        if (currentIndex < statuses.length - 1) {
            onUpdate(track.id, statuses[currentIndex + 1]);
        }
    };

    const prevStatus = () => {
        const currentIndex = statuses.indexOf(track.status);
        if (currentIndex > 0) {
            onUpdate(track.id, statuses[currentIndex - 1]);
        }
    };

    const currentIndex = statuses.indexOf(track.status);
    const isFirstStatus = currentIndex === 0;
    const isLastStatus = currentIndex === statuses.length - 1;

    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <h3 className={styles.title}>
                    <Link 
                        to="/track/$trackId" 
                        params={{ trackId: track.id.toString() }} 
                        className={styles.trackLink}
                    >
                        {track.title}
                    </Link>
                </h3>
                
                <div className={styles.infoBlock}>
                    <div className={styles.bpmBadge}>
                        <Zap size={16} className={styles.zapIcon} />
                        <span>{track.bpm} BPM</span>
                        <button 
                            className={styles.editBtn} 
                            onClick={handleEditBpm}
                            title="Edit BPM"
                        >
                            <Edit2 size={14} />
                        </button>
                    </div>

                    <span className={`${styles.statusBadge} ${styles[`status${track.status}`]}`}>
                        {track.status}
                    </span>
                </div>

                {/* БЛОК ПЛЕЕРА */}
                {track.file_path && (
                    <div className={styles.audioContainer}>
                        <div className={styles.audioLabel}>
                            <Music size={12} />
                            <span>{track.file_path}</span>
                        </div>
                        <audio 
                            controls 
                            className={styles.audioPlayer}
                            src={`http://127.0.0.1:8000/audio/${track.file_path}`}
                        >
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )}
            </div>
            
            <div className={styles.actions}>
                <button onClick={prevStatus} disabled={isFirstStatus} className={styles.iconBtn}>
                    <ChevronLeft size={24} />
                </button>
                <button onClick={nextStatus} disabled={isLastStatus} className={styles.iconBtn}>
                    <ChevronRight size={24} />
                </button>
                <button 
                    onClick={() => onDelete(track.id)}
                    className={`${styles.iconBtn} ${styles.deleteBtn}`}
                >
                    <Trash2 size={24} />
                </button>
            </div>
        </div>
    );
};