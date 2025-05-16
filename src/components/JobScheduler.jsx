import React, { useState, useEffect } from 'react';
import JobCalendar from './JobCalendar';

const LOCAL_KEY = 'job_scheduler';

export default function JobScheduler() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ date: '', location: '', crane: '', task: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    setJobs(stored ? JSON.parse(stored) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = [...jobs];
    if (editIndex !== null) {
      updated[editIndex] = form;
      setEditIndex(null);
    } else {
      updated.push(form);
    }
    setJobs(updated);
    setForm({ date: '', location: '', crane: '', task: '' });
  };

  const handleEdit = (index) => {
    setForm(jobs[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = jobs.filter((_, i) => i !== index);
    setJobs(updated);
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Location', 'Crane', 'Task', 'Price'];
    const rows = jobs.map(j => [j.date, j.location, j.crane, j.task, j.price]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map(e => e.join(",")).join("\n");
  
    const blob = new Blob([decodeURIComponent(encodeURI(csvContent))], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'job_schedule.csv';
    a.click();
  };  

  const [sortKey, setSortKey] = useState('date');

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortKey === 'price') return parseFloat(b.price || 0) - parseFloat(a.price || 0);
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div>
        <div className="mb-2 d-flex justify-content-between align-items-center">
  <span>Sort by:</span>
  <select className="form-select w-auto ms-2" value={sortKey} onChange={e => setSortKey(e.target.value)}>
    <option value="date">Date</option>
    <option value="price">Price</option>
  </select>
</div>
      <h3>📅 Job Scheduler</h3>
      <form className="row g-2 mb-3" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <input type="date" className="form-control" name="date" value={form.date} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Location" name="location" value={form.location} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Crane" name="crane" value={form.crane} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Task" name="task" value={form.task} onChange={handleChange} />
        </div>
        <div className="col-md-2">
        <input type="number" className="form-control" placeholder="Price $" name="price" value={form.price || ''} onChange={handleChange} />
        </div>
        <div className="col-md-12 text-end">
          <button type="submit" className="btn btn-success">{editIndex !== null ? 'Update' : 'Add Job'}</button>
        </div>
      </form>
      <button className="btn btn-outline-primary btn-sm" onClick={exportToCSV}>Export to CSV</button>
      <ul className="list-group">
        {jobs.map((job, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{job.date}</strong> – {job.location} – <em>{job.crane}</em> → {job.task}
            </div>
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(index)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
<JobCalendar jobs={jobs} />

    </div>
  );
}
