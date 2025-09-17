import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import FitnessPage from './pages/FitnessPage';
import VitalsPage from './pages/VitalsPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container my-4">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/fitness"
              element={
                <ProtectedRoute>
                  <FitnessPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/vitals"
              element={
                <ProtectedRoute>
                  <VitalsPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<h3>404 - Not found</h3>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
