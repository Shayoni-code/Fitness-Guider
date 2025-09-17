import React, { useEffect, useState } from 'react';
import { getWorkouts, setFitnessGoals, updateFitnessGoals, deleteFitnessGoals } from '../api/fitnessApi';

export default function FitnessPage() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await getWorkouts();
      // backend returns { goals: [...] } per your doc
      setGoals(res.data.goals || []);
    } catch (err) {
      console.error(err);
      setGoals([]);
    }
  };

  const handleAdd = async () => {
    if (!newGoal.trim()) return;
    const updated = [...goals, { goal: newGoal }];
    await updateFitnessGoals({ goals: updated }).catch(async () => {
      // If PUT fails, try POST (backend may expect POST first)
      await setFitnessGoals({ goals: updated });
    });
    setNewGoal('');
    fetchGoals();
  };

  const handleClearAll = async () => {
    await deleteFitnessGoals();
    fetchGoals();
  };

  return (
    <div>
      <h3>Fitness Goals</h3>
      <div className="mb-3">
        <input className="form-control d-inline-block w-75 me-2" value={newGoal} onChange={e => setNewGoal(e.target.value)} placeholder="New goal (e.g., Walk 10,000 steps)" />
        <button className="btn btn-primary" onClick={handleAdd}>Add</button>
      </div>

      <ul className="list-group">
        {goals.length === 0 && <li className="list-group-item">No goals set</li>}
        {goals.map((g, idx) => (
          <li key={idx} className="list-group-item">{g.goal} {g.progress ? ` — progress: ${g.progress}` : ''}</li>
        ))}
      </ul>

      <div className="mt-3">
        <button className="btn btn-danger" onClick={handleClearAll}>Delete All Goals</button>
      </div>
    </div>
  );
}
