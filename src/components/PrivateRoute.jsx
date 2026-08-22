import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Wrap any page you want to protect with <PrivateRoute>...</PrivateRoute>
// adminOnly=true means only emails in ADMIN_EMAILS (AuthContext.js) can enter.
function PrivateRoute({ children, adminOnly = false }) {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>Access denied</h2>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  return children;
}

export default PrivateRoute;
