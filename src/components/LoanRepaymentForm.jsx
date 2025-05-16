import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const LoanRepaymentForm = ({ onRepay }) => {
    const [repaymentAmount, setRepaymentAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (repaymentAmount > 0) {
            onRepay(parseInt(repaymentAmount));
            alert(`Repayment of ₹${repaymentAmount} recorded successfully!`);
            setRepaymentAmount("");
        } else {
            alert("Enter a valid repayment amount.");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 400,
                margin: "0 auto",
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                padding: 3,
                borderRadius: 4,
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            <TextField
                label="Repayment Amount"
                type="number"
                value={repaymentAmount}
                onChange={(e) => setRepaymentAmount(e.target.value)}
                fullWidth
                required
                InputProps={{
                    style: { color: "#ffffff", fontFamily: "'Poppins', sans-serif" },
                }}
                InputLabelProps={{
                    style: { color: "#ffffff", fontFamily: "'Poppins', sans-serif" },
                }}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "bold",
                    textTransform: "none",
                }}
            >
                Repay
            </Button>
        </Box>
    );
};

export default LoanRepaymentForm;