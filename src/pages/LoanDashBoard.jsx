import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";
import LoanRepaymentForm from "./LoanRepaymentForm";
import { Card, CardContent, Typography, Grid, Box, Divider } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const LoanDashboard = () => {
    const [loanData, setLoanData] = useState([]); // State to store loan data
    const { userId } = useSelector((state) => state.auth); // Get userId from Redux store
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Fetch loan data from the backend
        const fetchLoanData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/loan/user/${userId}`);
                setLoanData(response.data); // Assuming the response contains an array of loans
                setLoading(false);
            } catch (error) {
                console.error("Error fetching loan data:", error);
                setError("Failed to fetch loan data.");
                setLoading(false);
            }
        };

        if (userId) {
            fetchLoanData();
        }
    }, [userId]);

    if (loading) {
        return (
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                }}
            >
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                    Loading loan details...
                </Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                }}
            >
                <Typography variant="h6" sx={{ color: "#ffffff" }}>
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                padding: { xs: 2, sm: 4 },
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    textAlign: "center",
                    color: "#ffffff",
                    fontWeight: "bold",
                    marginBottom: 4,
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                Loan Dashboard
            </Typography>
            {loanData.map((loan) => (
                <Card
                    key={loan.loanId}
                    sx={{
                        width: "100%",
                        maxWidth: { xs: 360, sm: 600, md: 800 },
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 4,
                        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                        marginBottom: 4,
                    }}
                >
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#ffffff",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Loan Amount:
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#ffffff",
                                        fontFamily: "'Poppins', sans-serif",
                                    }}
                                >
                                    ₹{loan.loanAmount}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#ffffff",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Loan Type:
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#ffffff",
                                        fontFamily: "'Poppins', sans-serif",
                                    }}
                                >
                                    {loan.loanType}
                                </Typography>
                            </Grid>
                            <Divider
                                sx={{
                                    width: "100%",
                                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                                    marginY: 2,
                                }}
                            />
                            <Grid item xs={12} sm={6}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#ffffff",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Duration (Months):
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#ffffff",
                                        fontFamily: "'Poppins', sans-serif",
                                    }}
                                >
                                    {loan.duration}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#ffffff",
                                        fontFamily: "'Poppins', sans-serif",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Monthly EMI:
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#ffffff",
                                        fontFamily: "'Poppins', sans-serif",
                                    }}
                                >
                                    ₹{loan.monthlyEmi}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default LoanDashboard;