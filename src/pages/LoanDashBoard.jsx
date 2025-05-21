import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoansByUserId, fetchUserLoans } from "../redux/slices/loanSlice";
import { Card, CardContent, Typography, Grid, Box, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const LOAN_TYPES = [
    { value: "Auto loan", label: "Auto loan" },
    { value: "Personal loan", label: "Personal loan" },
    { value: "Home loan", label: "Home loan" },
    { value: "Business loan", label: "Business loan" },
];

const DURATIONS = [
    { value: 3, label: "3 months" },
    { value: 6, label: "6 months" },
    { value: 9, label: "9 months" },
    { value: 12, label: "12 months" },
    { value: 18, label: "18 months" },
    { value: 24, label: "24 months" },
];

const INTEREST_RATE = 0.10; // 10% annual interest for EMI calculation

const LoanDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loans, loading, error } = useSelector((state) => state.loan);
    const { userId } = useParams();

    // Add Loan Dialog State
    const [open, setOpen] = useState(false);
    const [loanType, setLoanType] = useState("");
    const [duration, setDuration] = useState("");
    const [amount, setAmount] = useState("");
    const [emi, setEmi] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (userId) {
            dispatch(fetchLoansByUserId(userId));
        } else {
            dispatch(fetchUserLoans());
        }
    }, [dispatch, userId]);

    // EMI Calculation (simple reducing balance formula)
    useEffect(() => {
        if (amount && duration) {
            const principal = parseFloat(amount);
            const months = parseInt(duration, 10);
            const monthlyRate = INTEREST_RATE / 12;
            if (principal > 0 && months > 0) {
                const emiCalc = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                    (Math.pow(1 + monthlyRate, months) - 1);
                setEmi(emiCalc ? emiCalc.toFixed(2) : "");
            } else {
                setEmi("");
            }
        } else {
            setEmi("");
        }
    }, [amount, duration]);

    if (loading) {
        return (
            <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1e3c72" }}>
                <Typography variant="h6" sx={{ color: "#ffffff" }}>Loading loan details...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1e3c72" }}>
                <Typography variant="h6" sx={{ color: "#ffffff" }}>{error}</Typography>
            </Box>
        );
    }

    // Only show Add Loan button if viewing own dashboard (not as admin)
    const showAddLoanButton = !userId;

    // Handle Add Loan Dialog
    const handleOpen = () => {
        setLoanType("");
        setDuration("");
        setAmount("");
        setEmi("");
        setFormError("");
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        if (!loanType || !duration || !amount || !emi) {
            setFormError("All fields are required.");
            return;
        }
        setSubmitting(true);
        try {
            // You may need to adjust the API endpoint and payload as per your backend
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:8080/loan/apply/${userId}`,
                {
                    loanType,
                    duration: parseInt(duration, 10),
                    loanAmount: parseFloat(amount),
                    monthlyEmi: parseFloat(emi),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setOpen(false);
            setSubmitting(false);
            // Refresh the loans list
            dispatch(fetchUserLoans());
        } catch (err) {
            setFormError(err.response?.data?.message || "Failed to apply for loan.");
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ height: "full", width: "full", overflowY: "auto", display: "flex", flexDirection: "column", alignItems: "center", background: "#1e3c72", padding: { xs: 2, sm: 4 } }}>
            <Typography variant="h3" gutterBottom sx={{ textAlign: "center", color: "#ffffff", fontWeight: "bold", marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>
                Loan Dashboard
            </Typography>

            {showAddLoanButton && (
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mb: 3, fontWeight: "bold" }}
                    onClick={handleOpen}
                >
                    Apply for a new Loan
                </Button>
            )}

            {/* Add Loan Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle>Apply for a Loan</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="loan-type-label">Type of Loan</InputLabel>
                            <Select
                                labelId="loan-type-label"
                                value={loanType}
                                label="Type of Loan"
                                onChange={(e) => setLoanType(e.target.value)}
                                required
                            >
                                {LOAN_TYPES.map((type) => (
                                    <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="duration-label">Duration</InputLabel>
                            <Select
                                labelId="duration-label"
                                value={duration}
                                label="Duration"
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            >
                                {DURATIONS.map((d) => (
                                    <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            label="Amount of Loan"
                            type="number"
                            fullWidth
                            value={amount}
                            onChange={(e) => setAmount(e.target.value.replace(/^0+/, ""))}
                            inputProps={{ min: 1, step: "any" }}
                            required
                        />
                        <TextField
                            margin="normal"
                            label="Monthly EMI"
                            fullWidth
                            value={emi}
                            InputProps={{ readOnly: true }}
                        />
                        {formError && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {formError}
                            </Typography>
                        )}
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary" variant="outlined">
                                Close
                            </Button>
                            <Button type="submit" color="primary" variant="contained" disabled={submitting}>
                                {submitting ? "Applying..." : "Apply"}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            {loans.length === 0 ? (
                <Typography sx={{ color: "#ffffff" }}>No loans found.</Typography>
            ) : (
                loans.map((loan) => (
                    <Card key={loan.loanId} sx={{ width: "50%", maxWidth: { xs: 360, sm: 600, md: 800 }, background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(10px)", borderRadius: 4, boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", marginBottom: 4 }}>
                        <CardContent>
                            <Grid container columns={{ xs: 12, sm: 6 }}>
                                <Grid>
                                    <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: "bold" }}>Loan Amount:</Typography>
                                    <Typography sx={{ color: "#ffffff" }}>₹{loan.loanAmount}</Typography>
                                </Grid>
                                <Grid>
                                    <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: "bold" }}>Loan Type:</Typography>
                                    <Typography sx={{ color: "#ffffff" }}>{loan.loanType}</Typography>
                                </Grid>
                            </Grid>

                            <Divider sx={{ width: "100%", backgroundColor: "rgba(255, 255, 255, 0.3)", marginY: 2 }} />

                            <Grid container columns={{ xs: 12, sm: 6 }}>
                                <Grid>
                                    <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: "bold" }}>Duration (Months):</Typography>
                                    <Typography sx={{ color: "#ffffff" }}>{loan.duration}</Typography>
                                </Grid>
                                <Grid>
                                    <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: "bold" }}>Monthly EMI:</Typography>
                                    <Typography sx={{ color: "#ffffff" }}>₹{loan.monthlyEmi}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default LoanDashboard;