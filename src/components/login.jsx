import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { TextField, Button, CircularProgress, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { userId, loading, firstName, role, error } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    useEffect(() => {
        if (!loading && userId && role) {
            if (role === 'ROLE_ADMIN') {
                navigate('/admin-dashboard');
            } else if (role === 'ROLE_CUSTOMER') {
                navigate('/loan-dashboard');
            } else {
                navigate('/dashboard'); // fallback
            }
        }
    }, [loading, userId, role, navigate]);

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    bgcolor: '#f4f6f9',
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h4" sx={{ mb: 2, color: '#3f51b5' }}>
                    Login
                </Typography>
                <form onSubmit={handleLogin} style={{ width: '100%' }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        sx={{ mb: 2 }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </Button>
                </form>

                {userId && (
                    <Typography variant="body1" color="success.main" sx={{ mb: 2 }}>
                        Welcome, {firstName}! Role: {role}
                    </Typography>
                )}

                {error && (
                    <Typography variant="body1" color="error.main" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default Login;
