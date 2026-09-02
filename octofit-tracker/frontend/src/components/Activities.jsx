import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    fetchCollection(endpoint).then(setActivities).catch((err) => setError(err.message));
  }, [endpoint]);

  return <Collection title="Recent activities" items={activities} error={error} renderItem={(activity) => (
    <article className="list-item" key={activity._id}>
      <strong>{activity.type}</strong><span>{activity.durationMinutes} min</span><span>{activity.calories} kcal</span>
    </article>
  )} />;
}

function Collection({ title, items, error, renderItem }) {
  return <section className="panel"><div className="panel-heading"><h2>{title}</h2><span>{items.length} entries</span></div>{error ? <p className="error">{error}</p> : items.length ? items.map(renderItem) : <p className="empty">No entries yet.</p>}</section>;
}