import React, { useState, useEffect } from 'react';

const LOCAL_KEY = 'load_charts';

export default function LoadChartViewer() {
  const [charts, setCharts] = useState([]);
  const [crane, setCrane] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    setCharts(saved ? JSON.parse(saved) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(charts));
  }, [charts]);

  const handleUpload = () => {
    if (!crane || !file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newCharts = [...charts, { crane, data: reader.result }];
      setCharts(newCharts);
      setCrane('');
      setFile(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (index) => {
    const updated = charts.filter((_, i) => i !== index);
    setCharts(updated);
  };

  return (
    <div>
      <h3>📊 Load Chart Manager</h3>
      <div className="row g-2 mb-3">
        <div className="col-md-5">
          <input type="text" placeholder="Crane Name" className="form-control" value={crane} onChange={e => setCrane(e.target.value)} />
        </div>
        <div className="col-md-4">
          <input type="file" accept="application/pdf,image/*" className="form-control" onChange={e => setFile(e.target.files[0])} />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100" onClick={handleUpload}>Upload</button>
        </div>
      </div>

      <ul className="list-group">
        {charts.map((c, i) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
            {c.crane}
            <div>
              <a href={c.data} target="_blank" rel="noreferrer" className="btn btn-sm btn-info me-2">View</a>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(i)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
