import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginPage from '../components/auth/LoginPage.jsx';
import useAuth from '../hooks/useAuth.js';

function Login() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <LoginPage />;
}

export default Login;
