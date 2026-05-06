// src/components/TrackCard.jsx
import { Trash2, ChevronRight, ChevronLeft, Edit2, Zap } from 'lucide-react';

const statusColors = {
    Idea: 'bg-gray-700/50',
    Recording: 'bg-blue-600/60',
    Mixing: 'bg-purple-600/60',
    Mastered: 'bg-emerald-600/70'
};

export default function TrackCard({ track, onDelete, onUpdate, onUpdateBpm }) {
    const handleEditBpm = () => {
        const newBpm = prompt(`Enter new BPM for ${track.title}:`, track.bpm);
        if (newBpm !== null && !isNaN(newBpm) && newBpm !== "") {
            onUpdateBpm(track.id, parseInt(newBpm));
        }
    };

    
    const statuses = ['Idea', 'Recording', 'Mixing', 'Mastered'];
    
    // Логика следующего статуса
    const nextStatus = () => {
        const currentIndex = statuses.indexOf(track.status);
        if (currentIndex < statuses.length - 1) {
            onUpdate(track.id, statuses[currentIndex + 1]);
        }
    };

    // Логика предыдущего статуса
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
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex justify-between items-center transition hover:border-purple-500/50 shadow-lg shadow-slate-950/20">
            <div className="space-y-3">
                {/* Название */}
                <h3 className="text-white font-extrabold text-2xl tracking-tight">{track.title}</h3>
                
                {/* Инфо-блок с BPM и статусом */}
                <div className="flex items-center gap-6 text-base text-slate-300">
                    <div className="flex items-center gap-2 font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-700">
                        <Zap size={16} className="text-purple-400" />
                        <span>{track.bpm} BPM</span>
                        <button className="text-slate-500 hover:text-white ml-1" onClick={handleEditBpm}>
                            <Edit2 size={14} />
                        </button>
                    </div>
                    <span className={`${statusColors[track.status]} px-3.5 py-1.5 rounded-lg text-sm text-white font-semibold border border-slate-600/40 uppercase tracking-wide`}>
                        {track.status}
                    </span>
                </div>
            </div>
            
            {/* Кнопки действий */}
            <div className="flex items-center gap-3">
                {/* Назад */}
                <button 
                    onClick={prevStatus}
                    disabled={isFirstStatus}
                    className={`p-3 rounded-xl transition ${isFirstStatus ? 'text-slate-600' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                    title="Previous Stage"
                >
                    <ChevronLeft size={24} />
                </button>

                {/* Вперед */}
                <button 
                    onClick={nextStatus}
                    disabled={isLastStatus}
                    className={`p-3 rounded-xl transition ${isLastStatus ? 'text-slate-600' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                    title="Next Stage"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Удалить */}
                <button 
                    onClick={() => onDelete(track.id)}
                    className="p-3 rounded-xl text-slate-500 hover:bg-red-950/50 hover:text-red-400 transition ml-2"
                >
                    <Trash2 size={24} />
                </button>
            </div>
        </div>
    );
}