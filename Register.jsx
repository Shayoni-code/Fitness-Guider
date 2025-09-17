import React, { useState } from 'react';
import { register as apiRegister } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    try {
      await apiRegister({ email, password });
      setMsg('Registered successfully. Please login.');
      setTimeout(() => navigate('/login'), 1200);
    } catch (error) {
      setErr(error?.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Register</h3>
        {msg && <div className="alert alert-success">{msg}</div>}
        {err && <div className="alert alert-danger">{err}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-2">
            <label className="form-label">Email</label>
            <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
          </div>
          <div className="mb-2">
            <label className="form-label">Password</label>
            <input className="form-control" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
          </div>
          <button className="btn btn-success">Register</button>
        </form>
      </div>
    </div>
  );
}
