import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((err) => setError(err.message)); }, []);
  return <section className="panel"><div className="panel-heading"><h2>Leaderboard</h2><span>Weekly points</span></div>{error ? <p className="error">{error}</p> : entries.length ? entries.sort((a, b) => a.rank - b.rank).map((entry) => <article className="list-item" key={entry._id}><strong>#{entry.rank}</strong><span>{entry.points} points</span><span>{entry.period}</span></article>) : <p className="empty">No rankings yet.</p>}</section>;
}