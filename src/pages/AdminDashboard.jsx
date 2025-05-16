import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Box,
} from "@mui/material";
import axios from "axios";

const AdminDashboard = () => {
    const [loans, setLoans] = useState([]); // State to store loan data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    // Fetch loan data from the backend
    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get("http://localhost:8080/admin/loans"); // Replace with your backend endpoint
                setLoans(response.data); // Assuming the response contains an array of loans
                setLoading(false);
            } catch (err) {
                console.error("Error fetching loan data:", err);
                setError("Failed to fetch loan data.");
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

    // Approve loan request
    const handleApprove = async (loanId) => {
        try {
            await axios.put(`http://localhost:8080/admin/loans/${loanId}/approve`); // Replace with your backend endpoint
            setLoans((prevLoans) =>
                prevLoans.map((loan) =>
                    loan.id === loanId ? { ...loan, status: "Approved" } : loan
                )
            );
            alert("Loan approved successfully!");
        } catch (err) {
            console.error("Error approving loan:", err);
            alert("Failed to approve loan.");
        }
    };

    // Deny loan request
    const handleDeny = async (loanId) => {
        try {
            await axios.put(`http://localhost:8080/admin/loans/${loanId}/deny`); // Replace with your backend endpoint
            setLoans((prevLoans) =>
                prevLoans.map((loan) =>
                    loan.id === loanId ? { ...loan, status: "Denied" } : loan
                )
            );
            alert("Loan denied successfully!");
        } catch (err) {
            console.error("Error denying loan:", err);
            alert("Failed to deny loan.");
        }
    };

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
                    Loading loan data...
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
                padding: 4,
                background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                minHeight: "100vh",
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    textAlign: "center",
                    color: "#ffffff",
                    fontWeight: "bold",
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                Admin Dashboard
            </Typography>
            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>User Name</strong></TableCell>
                            <TableCell><strong>Loan Amount</strong></TableCell>
                            <TableCell><strong>Repayment Progress</strong></TableCell>
                            <TableCell><strong>Due Date</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loans.map((loan) => (
                            <TableRow key={loan.id}>
                                <TableCell>{loan.userName}</TableCell>
                                <TableCell>₹{loan.amount}</TableCell>
                                <TableCell>
                                    {((loan.paidAmount / loan.amount) * 100).toFixed(2)}%
                                </TableCell>
                                <TableCell>{loan.dueDate}</TableCell>
                                <TableCell>{loan.status}</TableCell>
                                <TableCell>
                                    {loan.status === "Pending" && (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleApprove(loan.id)}
                                                sx={{ marginRight: 1 }}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleDeny(loan.id)}
                                            >
                                                Deny
                                            </Button>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AdminDashboard;