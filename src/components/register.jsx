import React, { useState } from 'react';
import { Grid, TextField, MenuItem, Button, Typography, Snackbar, Alert } from '@mui/material';
 
const Register = () => {
  const [customerData, setCustomerData] = useState({
    firstName: '', lastName: '', gender: '', phoneNumber: '', email: '', password: '', confirmPassword: '',
    age: '', dob: '', salary: '', aadharNumber: '', panNumber: '', walletAmount: '', role: ''
  });
 
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
 
  const handleChange = (event) => {
    setCustomerData({ ...customerData, [event.target.name]: event.target.value });
  };
 
  const handleRegister = (event) => {
    event.preventDefault();
    setLoading(true);
 
    if (!customerData.firstName || !customerData.lastName || !customerData.email) {
      setErrors({ ...errors, email: "Required fields cannot be empty!" });
      setSnackbarMessage("Please fill in all required fields.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }
 
    setSnackbarMessage("Registration successful!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    setLoading(false);
  };
 
  return (
    <Grid container spacing={0} sx={{
      width: "100vw",
      height: "100",
      background: "linear-gradient(135deg, #a3d5ff 0%, #ffffff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      left: 0,
    }}>
      <Grid item xs={12} sx={{ textAlign: "center",m:"20px 0 0 0" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#1976d2",
            fontWeight: 700,
            textShadow: "0 2px 8px rgba(25, 118, 210, 0.2)",
            transition: "color 0.3s",
            "&:hover": { color: "#0d47a1" }
          }}
        >
          Register
        </Typography>
 
        <form onSubmit={handleRegister} style={{ width: "100%", maxWidth: "600px", padding: "20px", margin: "auto" }}>
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Phone Number", name: "phoneNumber", type: "number" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm Password", name: "confirmPassword", type: "password" },
            { label: "Age", name: "age", type: "number" },
            { label: "Date of Birth", name: "dob", type: "date", InputLabelProps: { shrink: true } },
            { label: "Salary", name: "salary", type: "number" },
            { label: "Aadhaar Number", name: "aadharNumber", type: "number" },
            { label: "PAN Number", name: "panNumber" },
            { label: "Wallet Amount", name: "walletAmount", type: "number" },
          ].map(({ label, name, type, InputLabelProps }) => (
            <TextField
              key={name}
              label={label}
              name={name}
              type={type || "text"}
              value={customerData[name]}
              onChange={handleChange}
              error={!!errors[name]}
              helperText={errors[name]}
              fullWidth
              margin="normal"
              required
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                "& .MuiOutlinedInput-root:hover fieldset": {
                  borderColor: "#1976d2",
                  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.12)",
                },
              }}
              InputLabelProps={InputLabelProps}
            />
          ))}
 
          <TextField select label="Gender" name="gender" value={customerData.gender} onChange={handleChange}
            error={!!errors.gender} helperText={errors.gender} fullWidth margin="normal" required
            sx={{ backgroundColor: "white", borderRadius: 2, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            
          </TextField>
 
          <TextField select label="Role" name="role" value={customerData.role} onChange={handleChange}
            error={!!errors.role} helperText={errors.role} fullWidth margin="normal" required
            sx={{ backgroundColor: "white", borderRadius: 2, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="CUSTOMER">Customer</MenuItem>
          </TextField>
 
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{
            marginTop: "20px",
            transition: "background 0.3s, transform 0.2s",
            "&:hover": {
              backgroundColor: "#1565c0",
              transform: "scale(1.03)"
            }
          }}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
 
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};
 
export default Register;