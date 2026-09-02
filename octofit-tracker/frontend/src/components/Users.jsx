import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/` : 'http://localhost:8000/api/users/';
  useEffect(() => { fetchCollection(endpoint).then(setUsers).catch((err) => setError(err.message)); }, [endpoint]);
  return <section className="panel"><div className="panel-heading"><h2>Community</h2><span>{users.length} athletes</span></div>{error ? <p className="error">{error}</p> : users.length ? users.map((user) => <article className="list-item" key={user._id}><strong>{user.displayName || user.username}</strong><span>{user.email}</span><span>{user.bio}</span></article>) : <p className="empty">No users yet.</p>}</section>;
}