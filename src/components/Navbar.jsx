import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { token, userEmail, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Healthpulse</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {token && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/fitness">Fitness</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/vitals">Vitals</Link></li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!token ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            ) : (
              <>
                <li className="nav-item"><span className="nav-link">Hi, {userEmail}</span></li>
                <li className="nav-item"><button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
