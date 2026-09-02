import { useEffect, useState } from 'react';
import { fetchCollection } from '../api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const endpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/` : 'http://localhost:8000/api/teams/';
  useEffect(() => { fetchCollection(endpoint).then(setTeams).catch((err) => setError(err.message)); }, [endpoint]);
  return <section className="panel"><div className="panel-heading"><h2>Teams</h2><span>{teams.length} squads</span></div>{error ? <p className="error">{error}</p> : teams.length ? teams.map((team) => <article className="list-item" key={team._id}><strong>{team.name}</strong><span>{team.memberCount} members</span><span>{team.description}</span></article>) : <p className="empty">No teams yet.</p>}</section>;
}