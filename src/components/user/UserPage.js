// UserPage.js
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import UserPanel from './UserPanel';

function UserPage() {
  const { user } = useAuth();

  if (!user || user.role !== 'user') {
    return <Navigate to="/login" />;
  }
  return <UserPanel />;
}

export default UserPage;