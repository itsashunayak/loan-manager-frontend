import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../redux/slices/authSlice";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    CircularProgress,
    Button,
} from "@mui/material";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userId, token, userDetails, loading, error } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else if (userId) {
            dispatch(fetchUserDetails(userId));
        }
    }, [dispatch, userId, token, navigate]);

    if (loading || !userDetails) {
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
                <CircularProgress sx={{ color: "#ffffff" }} />
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

    // Helper to format labels
    const formatLabel = (key) => {
        return key
            .replace(/([A-Z])/g, " $1") // camelCase to space
            .replace(/_/g, " ") // snake_case to space
            .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize
    };

    // Fields to hide
    const hiddenFields = ["id", "password", "role"];

    // Format values
    const formatValue = (key, value) => {
        if (key === "dob") {
            return new Date(value).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        }
        if (key === "salary" || key === "walletAmount") {
            return `₹${parseFloat(value).toLocaleString("en-IN")}`;
        }
        return value;
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #1e3c72, #2a5298)",
                padding: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    padding: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 4,
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
                    color: "#ffffff",
                }}
            >
                <CardContent>
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                        User Profile
                    </Typography>
                    <Grid container spacing={2}>
                        {Object.entries(userDetails)
                            .filter(([key]) => !hiddenFields.includes(key))
                            .map(([key, value]) => (
                                <Grid item xs={12} sm={6} key={key}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {formatLabel(key)}:
                                    </Typography>
                                    <Typography>{formatValue(key, value)}</Typography>
                                </Grid>
                            ))}
                    </Grid>

                    <Box mt={4} display="flex" justifyContent="center">
                        <Button
                            variant="contained"
                            onClick={() => navigate(-1)}
                            sx={{
                                backgroundColor: "#ffffff",
                                color: "#1e3c72",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "#dddddd",
                                },
                            }}
                        >
                            Back to Dashboard
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Profile;
