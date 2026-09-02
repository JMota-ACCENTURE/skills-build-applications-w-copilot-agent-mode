import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { apiUrl } from './api.js';
import './App.css';

export default function App() {
  return <BrowserRouter><div className="app-shell"><header className="topbar"><Link className="brand" to="/">OctoFit <span>Tracker</span></Link><nav><Link to="/activities">Activities</Link><Link to="/users">Users</Link><Link to="/teams">Teams</Link><Link to="/leaderboard">Leaderboard</Link><Link to="/workouts">Workouts</Link></nav></header><main><p className="eyebrow">Personal fitness, shared momentum</p><h1>Make your next move count.</h1><p className="lede">Track the work, find your people, and keep your momentum visible.</p><div className="api-note">API connected to <strong>{apiUrl}</strong></div><Routes><Route path="/" element={<Navigate to="/activities" replace />} /><Route path="/activities" element={<Activities />} /><Route path="/users" element={<Users />} /><Route path="/teams" element={<Teams />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/workouts" element={<Workouts />} /></Routes></main></div></BrowserRouter>;
}