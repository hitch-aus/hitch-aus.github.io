import React, { useState, useEffect } from 'react';

const defaultGear = [
  { id: 'S001', type: 'Shackle', status: 'OK', nextInspection: '2025-06-30' },
  { id: 'S002', type: 'Sling', status: 'Expired', nextInspection: '2023-12-31' },
];

const LOCAL_KEY = 'gear_register';

export default function GearRegister() {
  const [gearList, setGearList] = useState([]);
  const [form, setForm] = useState({ id: '', type: '', status: 'OK', nextInspection: '' });
  const [editIndex, setEditIndex] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    setGearList(stored ? JSON.parse(stored) : defaultGear);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(gearList));
  }, [gearList]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id || !form.type || !form.nextInspection) return;

    const updated = [...gearList];
    if (editIndex !== null) {
      updated[editIndex] = form;
      setEditIndex(null);
    } else {
      updated.push(form);
    }

    setGearList(updated);
    setForm({ id: '', type: '', status: 'OK', nextInspection: '' });
  };

  const handleEdit = (index) => {
    setForm(gearList[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = gearList.filter((_, i) => i !== index);
    setGearList(updated);
  };

  return (
    <div>
      <h3>🧰 Gear Register</h3>
      <form className="row g-2 mb-3" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <input className="form-control" placeholder="ID" name="id" value={form.id} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Type" name="type" value={form.type} onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <select className="form-select" name="status" value={form.status} onChange={handleChange}>
            <option value="OK">OK</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
        <div className="col-md-3">
          <input className="form-control" type="date" name="nextInspection" value={form.nextInspection} onChange={handleChange} />
        </div>
        <div className="col-md-1">
          <button className="btn btn-success w-100" type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Status</th>
            <th>Next Inspection</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gearList.map((gear, i) => (
            <tr key={gear.id}>
              <td>{gear.id}</td>
              <td>{gear.type}</td>
              <td style={{ color: gear.status === 'Expired' ? 'red' : 'green' }}>{gear.status}</td>
              <td>{gear.nextInspection}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(i)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(i)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
