// Navbar.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import { Button } from '@mui/material';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token, firstName } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); // Redirect to home or login after logout
    };

    const handleProfile=()=>{
        navigate('/profile');
    }
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f0f0f0' }}>
            <h2>MyApp</h2>
            {token ? (
                <div>
                    <span style={{ marginRight: '1rem' }}>Hi, {firstName}!</span>
                    <button onClick={handleLogout}>Logout</button>
                    <div><Button onClick={handleProfile}>Profile</Button></div>
                </div>
            ) : (
                <div>
                    <button onClick={() => navigate('/login')}>Login</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
