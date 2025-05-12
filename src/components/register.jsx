import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  Container,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

const Register = () => {
  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    dob: "",
    phoneNumber: "",
    aadharNumber: "",
    panNumber: "",
    salary: "",
    walletAmount: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const validateFields = () => {
    let validationErrors = {};

    if (!customerData.firstName) validationErrors.firstName = "First name is required.";
    if (!customerData.lastName) validationErrors.lastName = "Last name is required.";
    if (!customerData.gender) validationErrors.gender = "Gender selection is required.";
    if (!customerData.phoneNumber.match(/^[0-9]{10}$/)) validationErrors.phoneNumber = "Phone must be 10 digits.";
    if (!customerData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) validationErrors.email = "Invalid email format.";
    if (customerData.password.length < 6) validationErrors.password = "Password must be at least 6 characters.";
    if (customerData.password !== customerData.confirmPassword) validationErrors.confirmPassword = "Passwords do not match.";
    if (!customerData.age || customerData.age < 18) validationErrors.age = "Age must be 18 or above.";
    if (!customerData.dob) validationErrors.dob = "Date of birth is required.";
    if (!customerData.aadharNumber.match(/^[0-9]{12}$/)) validationErrors.aadharNumber = "Aadhaar must be 12 digits.";
    if (!customerData.panNumber.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) validationErrors.panNumber = "Invalid PAN format.";
    if (!customerData.salary || customerData.salary <= 0) validationErrors.salary = "Salary must be a positive number.";
    if (!customerData.walletAmount || customerData.walletAmount < 0) validationErrors.walletAmount = "Wallet amount cannot be negative.";
    if (!customerData.role) validationErrors.role = "Please select a role.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // if (!validateFields()) {
    //   setSnackbarMessage("Please fix validation errors.");
    //   setSnackbarSeverity("error");
    //   setSnackbarOpen(true);
    //   return;
    // }

    const resultAction = await dispatch(registerUser(customerData));

    if (registerUser.fulfilled.match(resultAction)) {
      setSnackbarMessage("Registration Successful! Redirecting to Login...");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setSnackbarMessage(resultAction.payload || "Registration Failed!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="First Name"
            name="firstName"
            value={customerData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={customerData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Gender"
            name="gender"
            value={customerData.gender}
            onChange={handleChange}
            error={!!errors.gender}
            helperText={errors.gender}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            label="Phone Number"
            name="phoneNumber"
            type="number"
            value={customerData.phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={customerData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={customerData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={customerData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={customerData.age}
            onChange={handleChange}
            error={!!errors.age}
            helperText={errors.age}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={customerData.dob}
            onChange={handleChange}
            error={!!errors.dob}
            helperText={errors.dob}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Salary"
            name="salary"
            type="number"
            value={customerData.salary}
            onChange={handleChange}
            error={!!errors.salary}
            helperText={errors.salary}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Aadhaar Number"
            name="aadharNumber"
            type="number"
            value={customerData.aadharNumber}
            onChange={handleChange}
            error={!!errors.aadharNumber}
            helperText={errors.aadharNumber}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="PAN Number"
            name="panNumber"
            value={customerData.panNumber}
            onChange={handleChange}
            error={!!errors.panNumber}
            helperText={errors.panNumber}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Wallet Amount"
            name="walletAmount"
            type="number"
            value={customerData.walletAmount}
            onChange={handleChange}
            error={!!errors.walletAmount}
            helperText={errors.walletAmount}
            fullWidth
            margin="normal"
            required
          />
            <TextField
            select
            label="Role"
            name="role"
            value={customerData.role}
            onChange={handleChange}
            error={!!errors.role}
            helperText={errors.role}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="">Select Role</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="CUSTOMER">Customer</MenuItem>
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            style={{ marginTop: "20px" }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
