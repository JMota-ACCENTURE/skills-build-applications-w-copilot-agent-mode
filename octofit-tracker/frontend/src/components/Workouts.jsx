import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/` : 'http://localhost:8000/api/workouts/';
  useEffect(() => { fetchCollection(endpoint).then(setWorkouts).catch((err) => setError(err.message)); }, [endpoint]);
  return <section className="panel"><div className="panel-heading"><h2>Suggested workouts</h2><span>{workouts.length} plans</span></div>{error ? <p className="error">{error}</p> : workouts.length ? workouts.map((workout) => <article className="list-item" key={workout._id}><strong>{workout.title}</strong><span>{workout.durationMinutes} min</span><span>{workout.difficulty}</span></article>) : <p className="empty">No workouts yet.</p>}</section>;
}