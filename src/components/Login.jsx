import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const hardcodedUser = { username: 'admin', password: 'cranes123' };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === hardcodedUser.username && password === hardcodedUser.password) {
      localStorage.setItem('auth', 'yes');
      onLogin();
    } else {
      alert('Invalid login');
    }
  };

  return (
    <div className="mt-5 text-center">
      <h2>🔐 Crane Dashboard Login</h2>
      <form className="w-100" style={{ maxWidth: 400, margin: 'auto' }} onSubmit={handleLogin}>
        <input className="form-control mb-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="form-control mb-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100" type="submit">Login</button>
      </form>
    </div>
  );
}
