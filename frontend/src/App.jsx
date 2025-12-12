import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateEditNote from './pages/CreateEditNote';
import Trash from './pages/Trash';
import Profile from './pages/Profile';
import PrivateRoute from './utils/PrivateRoute';

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/create" element={<PrivateRoute><CreateEditNote /></PrivateRoute>} />
            <Route path="/edit/:id" element={<PrivateRoute><CreateEditNote /></PrivateRoute>} />
            <Route path="/trash" element={<PrivateRoute><Trash /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

            {/* fallback */}
            <Route path="*" element={<div className="min-h-screen flex items-center justify-center">Page not found</div>} />
        </Routes>
    );
}
