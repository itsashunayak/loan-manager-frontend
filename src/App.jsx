import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Register from './components/register';
import Login from './components/login';
import LoanDashboard from './pages/LoanDashBoard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './utils/ProtectedRoutes';
import Navbar from './components/Navbar';

const App = () => {
    const { token, role } = useSelector((state) => state.auth);
     const location = useLocation();
      const noNavbarRoutes = ['/login', '/register'];
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

    return (
        <>
         {showNavbar && <Navbar />}
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Customer-only route */}
                <Route
                    path="/loan-dashboard"
                    element={
                        <ProtectedRoute token={token} role={role} allowedRole="ROLE_CUSTOMER">
                            <LoanDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Admin-only route */}
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute token={token} role={role} allowedRole="ROLE_ADMIN">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Redirect to login by default */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </>
        
    );
};

export default App;
