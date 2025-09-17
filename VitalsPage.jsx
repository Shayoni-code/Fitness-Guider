import React, { useEffect, useState } from 'react';
import { getVitals, addVital, deleteVital } from '../api/vitalApi';

export default function VitalsPage() {
  const [vitals, setVitals] = useState([]);
  const [type, setType] = useState('Blood Pressure');
  const [value, setValue] = useState('');
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetchVitals();
  }, []);

  const fetchVitals = async () => {
    try {
      const res = await getVitals();
      setVitals(res.data.vitals || res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    setErr(null);
    if (!value.trim()) return setErr('Enter a value');
    try {
      await addVital({ type, value });
      setValue('');
      fetchVitals();
    } catch (error) {
      setErr(error?.response?.data?.error || 'Failed to add vital');
    }
  };

  const handleDelete = async (id) => {
    await deleteVital(id);
    fetchVitals();
  };

  return (
    <div>
      <h3>Vitals</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <div className="row g-2 align-items-end mb-3">
        <div className="col-md-3">
          <label className="form-label">Type</label>
          <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
            <option>Blood Pressure</option>
            <option>Heart Rate</option>
            <option>Weight</option>
            <option>Blood Sugar</option>
          </select>
        </div>
        <div className="col-md-5">
          <label className="form-label">Value</label>
          <input className="form-control" value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g., 120/80 mmHg" />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={handleAdd}>Add</button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr><th>Type</th><th>Value</th><th>Date</th><th></th></tr>
        </thead>
        <tbody>
          {vitals.length === 0 && (
            <tr><td colSpan="4">No vitals recorded</td></tr>
          )}
          {vitals.map((v) => (
            <tr key={v._id || v.id}>
              <td>{v.type}</td>
              <td>{v.value}</td>
              <td>{new Date(v.createdAt || v.date || v.timestamp).toLocaleString()}</td>
              <td><button className="btn btn-sm btn-danger" onClick={() => handleDelete(v._id || v.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
