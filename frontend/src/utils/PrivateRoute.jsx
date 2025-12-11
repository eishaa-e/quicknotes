import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <div className="p-8">Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    return children;
}
