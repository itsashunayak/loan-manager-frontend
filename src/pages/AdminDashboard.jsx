import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box, TextField, InputAdornment,FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { fetchLoansByUserId } from "../redux/slices/loanSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState(""); // <-- Add role filter state
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://localhost:8080/auth/users"); // ✅ Correct endpoint
                console.log("Fetched user data:", response.data); // ✅ Debugging output
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching users:", err); // ✅ Log error details
                setError("Failed to fetch users.");
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleUserClick = (userId) => {
        dispatch(fetchLoansByUserId(userId)); // ✅ Fetch loans via Redux
        navigate(`/loan-dashboard/${userId}`); // ✅ Navigate to Loan Dashboard
    };

    if (loading) {
        return (
            <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1e3c72, #2a5298)" }}>
                <Typography variant="h6" sx={{ color: "#fff" }}>Loading user data...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1e3c72, #2a5298)" }}>
                <Typography variant="h6" sx={{ color: "#fff" }}>{error}</Typography>
            </Box>
        );
    }

    // const filteredUsers = users.filter((user) =>
    //     user.id?.toString().toLowerCase().includes(search.toLowerCase()) ||
    //     user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
    //     user.email?.toLowerCase().includes(search.toLowerCase())
    // );

    // Add role filter to filteredUsers
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.id?.toString().toLowerCase().includes(search.toLowerCase()) ||
            user.firstName?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase());
        const matchesRole =
            !roleFilter || user.role?.toLowerCase() === roleFilter.toLowerCase();
        return matchesSearch && matchesRole;
    });

    return (
        <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)", padding: { xs: 1, sm: 4 } }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", color: "#22223b", fontWeight: "bold", fontFamily: "'Poppins', sans-serif", mb: 3, letterSpacing: 1 }}>
                Admin Dashboard
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search by Name, Email, or ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="primary" />
                            </InputAdornment>
                        ),
                        sx: { background: "#fff", borderRadius: 2, marginRight:2 }
                    }}
                />
                
                <FormControl size="small" sx={{ minWidth: 160, background: "#fff", borderRadius: 2 }}>
                    <InputLabel id="role-filter-label">Filter by Role</InputLabel>
                    <Select
                        labelId="role-filter-label"
                        value={roleFilter}
                        label="Filter by Role"
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="customer">Customer</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 4, background: "rgba(255,255,255,0.95)" }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ background: "#ffe066" }}>
                            <TableCell sx={{ fontWeight: "bold" }}>User ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">No users found.</TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow key={user.id} hover onClick={() => handleUserClick(user.id)} sx={{ cursor: "pointer", transition: "background 0.2s", "&:hover": { background: "#f1faee" } }}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" size="small" onClick={() => handleUserClick(user.id)}>
                                            View Loans
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AdminDashboard;
