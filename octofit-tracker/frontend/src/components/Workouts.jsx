import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((err) => setError(err.message)); }, []);
  return <section className="panel"><div className="panel-heading"><h2>Suggested workouts</h2><span>{workouts.length} plans</span></div>{error ? <p className="error">{error}</p> : workouts.length ? workouts.map((workout) => <article className="list-item" key={workout._id}><strong>{workout.title}</strong><span>{workout.durationMinutes} min</span><span>{workout.difficulty}</span></article>) : <p className="empty">No workouts yet.</p>}</section>;
}