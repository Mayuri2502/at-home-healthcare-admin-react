import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Login, ForgotPassword, ResetPassword } from './pages/auth';
import { Dashboard } from './pages/dashboard';
import { Doctors } from './pages/doctors';
import { DoctorDetail } from './pages/doctor-detail';
import Providers, { CreateProvider } from './pages/providers';
import { Services } from './pages/services';
import Requests from './pages/requests';
import Forms from './pages/forms';
import Notifications from './pages/notifications';
import ProtectedRoute from './components/ProtectedRoute';

// Extend Window interface for global logout function
declare global {
  interface Window {
    logout?: () => void;
  }
}

// Global logout function
window.logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

function App() {
  useEffect(() => {
    // Add global styles for authentication
    const style = document.createElement('style');
    style.textContent = `
      .auth-logout {
        cursor: pointer;
        color: #ef4444;
        transition: color 0.2s;
      }
      .auth-logout:hover {
        color: #dc2626;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/doctors" element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          } />
          <Route path="/doctors/:id" element={
            <ProtectedRoute>
              <DoctorDetail />
            </ProtectedRoute>
          } />
          <Route path="/providers" element={
            <ProtectedRoute>
              <Providers />
            </ProtectedRoute>
          } />
          <Route path="/providers/create" element={
            <ProtectedRoute>
              <CreateProvider />
            </ProtectedRoute>
          } />
          <Route path="/providers/edit/:id" element={
            <ProtectedRoute>
              <CreateProvider />
            </ProtectedRoute>
          } />
          <Route path="/services" element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          } />
          <Route path="/requests" element={
            <ProtectedRoute>
              <Requests />
            </ProtectedRoute>
          } />
          <Route path="/forms" element={
            <ProtectedRoute>
              <Forms />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
