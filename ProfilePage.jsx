import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../api/profileApi';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setProfile(res.data);
    } catch (error) {
      setErr(error?.response?.data?.error || 'Failed to load profile');
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(profile);
      setEditing(false);
      setMsg('Profile updated');
      setTimeout(() => setMsg(null), 2000);
    } catch (error) {
      setErr(error?.response?.data?.error || 'Update failed');
    }
  };

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div>
      <h3>Your Profile</h3>
      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      {editing ? (
        <div>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input className="form-control" value={profile.name || ''} onChange={e => setProfile({...profile, name: e.target.value})}/>
          </div>
          <div className="row">
            <div className="col">
              <label>Age</label>
              <input className="form-control" type="number" value={profile.age || ''} onChange={e => setProfile({...profile, age: e.target.value})}/>
            </div>
            <div className="col">
              <label>Gender</label>
              <input className="form-control" value={profile.gender || ''} onChange={e => setProfile({...profile, gender: e.target.value})}/>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col">
              <label>Height (cm)</label>
              <input className="form-control" type="number" value={profile.height || ''} onChange={e => setProfile({...profile, height: e.target.value})}/>
            </div>
            <div className="col">
              <label>Weight (kg)</label>
              <input className="form-control" type="number" value={profile.weight || ''} onChange={e => setProfile({...profile, weight: e.target.value})}/>
            </div>
          </div>

          <div className="mb-2 mt-2">
            <label>Medical conditions</label>
            <textarea className="form-control" value={profile.medicalConditions || ''} onChange={e => setProfile({...profile, medicalConditions: e.target.value})}/>
          </div>

          <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
          <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {profile.name || '-'}</p>
          <p><strong>Age:</strong> {profile.age || '-'}</p>
          <p><strong>Gender:</strong> {profile.gender || '-'}</p>
          <p><strong>Height:</strong> {profile.height ? `${profile.height} cm` : '-'}</p>
          <p><strong>Weight:</strong> {profile.weight ? `${profile.weight} kg` : '-'}</p>
          <p><strong>Medical Conditions:</strong> {profile.medicalConditions || '-'}</p>

          <button className="btn btn-outline-primary" onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
