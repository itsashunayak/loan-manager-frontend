import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLoans } from "../redux/slices/loanSlice";
import { Card, CardContent, Typography, Grid, Box, Divider } from "@mui/material";

const LoanDashboard = () => {
    const dispatch = useDispatch();
    const { loans, loading, error } = useSelector((state) => state.loan);

    useEffect(() => {
        dispatch(fetchUserLoans());
    }, [dispatch]);

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
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
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

            {loans.map((loan) => (
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
                                <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: "bold" }}>
                                    Loan Amount:
                                </Typography>
                                <Typography sx={{ color: "#ffffff" }}>
                                    ₹{loan.loanAmount}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: "bold" }}>
                                    Loan Type:
                                </Typography>
                                <Typography sx={{ color: "#ffffff" }}>
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
                                <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: "bold" }}>
                                    Duration (Months):
                                </Typography>
                                <Typography sx={{ color: "#ffffff" }}>
                                    {loan.duration}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: "bold" }}>
                                    Monthly EMI:
                                </Typography>
                                <Typography sx={{ color: "#ffffff" }}>
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
