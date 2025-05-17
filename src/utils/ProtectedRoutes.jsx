import React from 'react';
import { Navigate } from 'react-router-dom';
import Unauthorized from '../pages/Unauthorized';

const ProtectedRoute = ({ token, role, allowedRole, children }) => {
    if (!token) {
        // Not logged in - redirect to login
        return <Navigate to="/login" replace />;
    }

    if (role !== allowedRole) {
        // Logged in but wrong role - show Unauthorized page
        return <Unauthorized />;
    }

    return children;
};

export default ProtectedRoute;
