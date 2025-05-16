import React, { useState, useEffect } from 'react';
import GearRegister from './components/GearRegister';
import JobScheduler from './components/JobScheduler';
import LoadChartViewer from './components/LoadChartViewer';
import Login from './components/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem('auth') === 'yes');
  }, []);

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <div className="container p-4">
      <h1>🚧 Crane Operations Dashboard</h1>
      <button className="btn btn-sm btn-outline-danger float-end" onClick={() => { localStorage.removeItem('auth'); window.location.reload(); }}>Logout</button>
      <GearRegister />
      <hr />
      <JobScheduler />
      <hr />
      <LoadChartViewer />
    </div>
  );
}

export default App;
