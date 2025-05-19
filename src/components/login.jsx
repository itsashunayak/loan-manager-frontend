import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { TextField, Button, CircularProgress, Container, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
 
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
 
// ...existing code...
return (
    <Grid
        container
        sx={{
            background: 'linear-gradient(135deg,rgb(198, 226, 255) 0%,rgb(232, 245, 248) 100%)',
            display: 'block',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden', // Prevent scrollbars
            }}
        >
            <form
                onSubmit={handleLogin}
                style={{
                    width: '100%',
                    maxWidth: 400,
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        mb: 3,
                        color: '#1976d2',
                        fontWeight: 700,
                        letterSpacing: 1,
                        textShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
                        transition: 'color 0.3s',
                        '&:hover': {
                            color: '#0d47a1',
                        },
                    }}
                >
                    Login
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                        mb: 2,
                        bgcolor: '#fff',
                        borderRadius: 2,
                        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                        transition: 'box-shadow 0.3s, border-color 0.3s',
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: '#1976d2',
                                boxShadow: '0 2px 8px rgba(25, 118, 210, 0.12)',
                            },
                        },
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        mb: 2,
                        bgcolor: '#fff',
                        borderRadius: 2,
                        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                        transition: 'box-shadow 0.3s, border-color 0.3s',
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: '#1976d2',
                                boxShadow: '0 2px 8px rgba(25, 118, 210, 0.12)',
                            },
                        },
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{
                        mb: 2,
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: '1rem',
                        letterSpacing: 0.5,
                        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.12)',
                        transition: 'background 0.3s, box-shadow 0.3s, transform 0.2s',
                        '&:hover': {
                            background: 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)',
                            boxShadow: '0 4px 16px rgba(25, 118, 210, 0.18)',
                            transform: 'translateY(-2px) scale(1.03)',
                        },
                    }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                </Button>
 
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
                <Typography sx={{ mt: 2, fontSize: 18, textAlign: 'center' }}>
                    New user? <Link to="/register" style={{ color: '#1976d2', fontWeight: 'bold', textDecoration: 'none' }}>Sign up here</Link>
                </Typography>
            </form>
        </Box>
    </Grid>
);
// ...existing code...
// ...existing code...
};
 
export default Login;