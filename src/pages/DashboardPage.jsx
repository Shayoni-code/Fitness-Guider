import React, { useEffect, useState } from 'react';
import { getProfile } from '../api/profileApi';
import { getWorkouts } from '../api/fitnessApi';
import { getVitals } from '../api/vitalApi';

export default function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [goals, setGoals] = useState([]);
  const [vitals, setVitals] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [pRes, fRes, vRes] = await Promise.all([getProfile(), getWorkouts(), getVitals()]);
      setProfile(pRes.data || {});
      setGoals((fRes.data && fRes.data.goals) || []);
      setVitals((vRes.data && (vRes.data.vitals || vRes.data)) || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Dashboard</h3>

      <div className="row">
        <div className="col-md-4">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Profile</h5>
              <p><strong>Name:</strong> {profile?.name || '-'}</p>
              <p><strong>Age:</strong> {profile?.age || '-'}</p>
              <p><strong>Weight:</strong> {profile?.weight ? `${profile.weight} kg` : '-'}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Fitness Goals</h5>
              <ul>
                {goals.length ? goals.map((g, i) => <li key={i}>{g.goal} {g.progress ? `— ${g.progress}` : ''}</li>) : <li>No goals</li>}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Recent Vitals</h5>
              <ul>
                {vitals.length ? vitals.slice(0,5).map(v => <li key={v._id || v.id}>{v.type}: {v.value}</li>) : <li>No vitals</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p className="text-muted">Charts and notifications can be added later (e.g., Chart.js).</p>
    </div>
  );
}
