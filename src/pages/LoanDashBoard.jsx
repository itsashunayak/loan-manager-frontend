import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  applyForLoan,
  fetchLoansByUserId,
  fetchUserLoans,
} from "../redux/slices/loanSlice";
import { useParams } from "react-router-dom";

const interestRates = {
  "Home loan": 0.08,
  "Auto loan": 0.1,
  "Personal loan": 0.12,
};

const cardColors = [
  "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
  "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)",
  "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)",
  "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)",
  "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
];

const LoanDashboard = () => {
  const dispatch = useDispatch();
  const { loans, loading, error } = useSelector((state) => state.loan);

  const [openDialog, setOpenDialog] = useState(false);
  const [loanType, setLoanType] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [monthlyEmi, setMonthlyEmi] = useState("");
  const [interest, setInterest] = useState("");
  const [rate, setRate] = useState("");

  const durations = [12, 24, 36, 48, 60]; // in months

  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(fetchLoansByUserId(userId));
    } else {
      dispatch(fetchUserLoans());
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (loanType && amount && duration) {
      calculateEMI(amount, duration, loanType);
    }
  }, [loanType, amount, duration]);

  const calculateEMI = (amount, duration, loanType) => {
    const principal = parseFloat(amount);
    const months = parseInt(duration);
    const rate = interestRates[loanType];

    if (!principal || !months || !rate) {
      setMonthlyEmi("");
      setInterest("");
      setRate("");
      return;
    }

    const monthlyRate = rate / 12;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    setMonthlyEmi(emi.toFixed(2));
    setInterest(totalInterest.toFixed(2));
    setRate((rate * 100).toFixed(2)); // show % value
  };

  const handleApplyLoan = async () => {
    try {
      await dispatch(
        applyForLoan({
          loanType,
          duration,
          loanAmount: amount,
          monthlyEmi,
          interest,
        })
      ).unwrap();

      dispatch(fetchUserLoans());
      setOpenDialog(false);
      setLoanType("");
      setDuration("");
      setAmount("");
      setMonthlyEmi("");
      setInterest("");
      setRate("");
    } catch (err) {
      console.error("Loan application error:", err);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        p: 4,
        boxSizing: "border-box",
        bgcolor: "#f0f4f8",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#3f51b5", mb: 3, textAlign: "center" }}
      >
        Loan Dashboard
      </Typography>

      {loading && (
        <Box textAlign="center" my={4}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && loans.length === 0 && !error && (
        <Typography
          variant="h6"
          color="textSecondary"
          sx={{ mt: 4, textAlign: "center", fontStyle: "italic" }}
        >
          No loans found.
        </Typography>
      )}

      <Grid container spacing={3} justifyContent="center">
        {loans.map((loan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                background: cardColors[index % cardColors.length],
                color: "white",
                p: 3,
                borderRadius: 3,
                boxShadow:
                  "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Typography variant="h5" fontWeight="600" mb={1}>
                {loan.loanType}
              </Typography>
              <Typography fontWeight="500">Amount: ₹{loan.loanAmount}</Typography>
              <Typography fontWeight="500">Duration: {loan.duration} months</Typography>
              <Typography fontWeight="500">Monthly EMI: ₹{loan.monthlyEmi}</Typography>
              <Typography fontWeight="500">Interest: ₹{loan.interest}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {!userId && (
        <Box textAlign="center" mt={5}>
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenDialog(true)}
            sx={{
              background:
                "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "white",
              fontWeight: "bold",
              px: 5,
              py: 1.5,
              boxShadow:
                "0 3px 5px 2px rgba(33, 203, 243, .3)",
              "&:hover": {
                background:
                  "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
              },
            }}
          >
            Apply for a Loan
          </Button>
        </Box>
      )}

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{ background: "#3f51b5", color: "white", fontWeight: "bold" }}
        >
          Apply for a Loan
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                select
                label="Loan Type"
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiInputLabel-root": { color: "#3f51b5" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#3f51b5" },
                    "&:hover fieldset": { borderColor: "#1a237e" },
                    "&.Mui-focused fieldset": { borderColor: "#1a237e" },
                  },
                }}
              >
                {Object.keys(interestRates).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                label="Duration (months)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiInputLabel-root": { color: "#3f51b5" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#3f51b5" },
                    "&:hover fieldset": { borderColor: "#1a237e" },
                    "&.Mui-focused fieldset": { borderColor: "#1a237e" },
                  },
                }}
              >
                {durations.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d} months
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Loan Amount (₹)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiInputLabel-root": { color: "#3f51b5" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#3f51b5" },
                    "&:hover fieldset": { borderColor: "#1a237e" },
                    "&.Mui-focused fieldset": { borderColor: "#1a237e" },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Interest Rate (%)"
                value={rate}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{
                  "& .MuiInputLabel-root": { color: "#3f51b5" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#3f51b5" },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Monthly EMI (₹)"
                value={monthlyEmi}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{
                  "& .MuiInputLabel-root": { color: "#3f51b5" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#3f51b5" },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Total Interest (₹)"
                value={interest}
                InputProps={{ readOnly: true }}
                fullWidth
                sx={{
                  "& .MuiInputLabel-root": { color: "#3f51b5" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#3f51b5" },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                onClick={handleApplyLoan}
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  background:
                    "linear-gradient(45deg, #3f51b5 30%, #5c6bc0 90%)",
                  fontWeight: "bold",
                  py: 1.5,
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #5c6bc0 30%, #3f51b5 90%)",
                  },
                }}
              >
                Submit Application
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LoanDashboard;
