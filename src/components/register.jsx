import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Container, Typography, Paper, Snackbar, Alert } from '@mui/material';

const Register = () => {
    const [customerData, setCustomerData] = useState({
        fname: '',
        lname: '',
        gender: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        salary: '',
        adhaar: '',
        pan: '',
        walletAmt: '',
        loans: []
    });

    const [errors, setErrors] = useState({}); // Validation errors

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.auth);

    // Snackbar state for notifications
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Validation functions
    const validateFields = () => {
        let validationErrors = {};

        if (!customerData.fname) validationErrors.fname = 'First name is required.';
        if (!customerData.lname) validationErrors.lname = 'Last name is required.';
        if (!customerData.gender) validationErrors.gender = 'Gender selection is required.';
        if (!customerData.phone.match(/^[0-9]{10}$/)) validationErrors.phone = 'Phone must be 10 digits.';
        if (!customerData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) validationErrors.email = 'Invalid email format.';
        if (customerData.password.length < 6) validationErrors.password = 'Password must be at least 6 characters.';
        if (customerData.password !== customerData.confirmPassword) validationErrors.confirmPassword = 'Passwords do not match.';
        if (!customerData.adhaar.match(/^[0-9]{12}$/)) validationErrors.adhaar = 'Aadhaar must be 12 digits.';
        if (!customerData.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) validationErrors.pan = 'Invalid PAN format.';
        if (!customerData.salary || customerData.salary <= 0) validationErrors.salary = 'Salary must be a positive number.';
        if (!customerData.walletAmt || customerData.walletAmt < 0) validationErrors.walletAmt = 'Wallet amount cannot be negative.';

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleChange = (e) => {
        setCustomerData({ ...customerData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            setSnackbarMessage("Please fix validation errors.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        const resultAction = await dispatch(registerUser(customerData));

        if (registerUser.fulfilled.match(resultAction)) {
            setSnackbarMessage("Registration Successful! Redirecting to Login...");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            setTimeout(() => navigate('/login'), 2000);
        } else if (registerUser.rejected.match(resultAction)) {
            setSnackbarMessage(resultAction.payload || "Registration Failed!");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>Register</Typography>
                <form onSubmit={handleRegister}>
                    <TextField label="First Name" name="fname" value={customerData.fname} onChange={handleChange} error={!!errors.fname} helperText={errors.fname} fullWidth margin="normal" required />
                    <TextField label="Last Name" name="lname" value={customerData.lname} onChange={handleChange} error={!!errors.lname} helperText={errors.lname} fullWidth margin="normal" required />
                    <TextField select label="Gender" name="gender" value={customerData.gender} onChange={handleChange} error={!!errors.gender} helperText={errors.gender} fullWidth margin="normal" required>
                        <MenuItem value="">Select Gender</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                    <TextField label="Phone Number" name="phone" type="number" value={customerData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} fullWidth margin="normal" required />
                    <TextField label="Email" name="email" type="email" value={customerData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} fullWidth margin="normal" required />
                    <TextField label="Password" name="password" type="password" value={customerData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} fullWidth margin="normal" required />
                    <TextField label="Confirm Password" name="confirmPassword" type="password" value={customerData.confirmPassword} onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword} fullWidth margin="normal" required />
                    <TextField label="Salary" name="salary" type="number" value={customerData.salary} onChange={handleChange} error={!!errors.salary} helperText={errors.salary} fullWidth margin="normal" required />
                    <TextField label="Aadhaar Number" name="adhaar" type="number" value={customerData.adhaar} onChange={handleChange} error={!!errors.adhaar} helperText={errors.adhaar} fullWidth margin="normal" required />
                    <TextField label="PAN Number" name="pan" value={customerData.pan} onChange={handleChange} error={!!errors.pan} helperText={errors.pan} fullWidth margin="normal" required />
                    <TextField label="Wallet Amount" name="walletAmt" type="number" value={customerData.walletAmt} onChange={handleChange} error={!!errors.walletAmt} helperText={errors.walletAmt} fullWidth margin="normal" required />
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} style={{ marginTop: '20px' }}>
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </form>
            </Paper>

            {/* Snackbar Notification */}
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Register;