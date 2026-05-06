// src/App.jsx
import { useState, useEffect } from 'react';
import { trackApi } from './api/api';
import TrackCard from './components/TrackCard';
import { Music, PlusCircle } from 'lucide-react';

function App() {
    const [tracks, setTracks] = useState([]);
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => {
        loadTracks();
    }, []);

    const loadTracks = async () => {
        try {
            const res = await trackApi.getTracks();
            setTracks(res.data);
        } catch (error) {
            console.error("Error loading tracks", error);
        }
    };

    const addTrack = async (e) => {
        e.preventDefault();
        if (!newTitle) return;
        try {
            await trackApi.createTrack({ title: newTitle, bpm: 120, status: 'Idea' });
            setNewTitle('');
            loadTracks();
        } catch (error) {
            console.error("Error creating track", error);
        }
    };

    const handleUpdate = async (id, status) => {
        try {
            await trackApi.updateStatus(id, status);
            loadTracks();
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await trackApi.deleteTrack(id);
            loadTracks();
        } catch (error) {
            console.error("Error deleting track", error);
        }
    };

    const handleUpdateBpm = async (id, bpm) => {
        try {
            await trackApi.updateBpm(id, bpm); // <--- Проверь это имя метода
            loadTracks(); 
        } catch (error) {
            console.error("Error updating BPM", error);
        }
    };
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-8 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto space-y-12">
                {/* Заголовок крупный */}
                <header className="flex items-center gap-6 mb-16 border-b border-slate-800 pb-8">
                    <div className="bg-purple-600 p-5 rounded-3xl shadow-xl shadow-purple-950/20">
                        <Music className="text-white" size={40} />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black uppercase tracking-widest text-white">Band Pipeline</h1>
                        <p className="text-slate-400 text-lg mt-1">Manage your release stages</p>
                    </div>
                </header>

                {/* Форма крупная */}
                <form onSubmit={addTrack} className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 flex gap-4">
                    <input 
                        type="text" 
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Working title of your next banger..."
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-6 py-4 text-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                    <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-purple-950/20">
                        <PlusCircle size={20} />
                        ADD DEMO
                    </button>
                </form>

                {/* Список крупный */}
                <div className="grid gap-5">
                    {tracks.length === 0 && (
                        <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800">
                           <Music size={48} className="mx-auto text-slate-700 mb-4" />
                           <p className="text-slate-500 text-lg">No demos in the pipeline. Try adding one!</p>
                        </div>
                    )}
                    {tracks.map(track => (
                        <TrackCard 
                            key={track.id} 
                            track={track} 
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                            onUpdateBpm={handleUpdateBpm}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;