import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/` : 'http://localhost:8000/api/leaderboard/';
  useEffect(() => { fetchCollection(endpoint).then(setEntries).catch((err) => setError(err.message)); }, [endpoint]);
  return <section className="panel"><div className="panel-heading"><h2>Leaderboard</h2><span>Weekly points</span></div>{error ? <p className="error">{error}</p> : entries.length ? entries.sort((a, b) => a.rank - b.rank).map((entry) => <article className="list-item" key={entry._id}><strong>#{entry.rank}</strong><span>{entry.points} points</span><span>{entry.period}</span></article>) : <p className="empty">No rankings yet.</p>}</section>;
}