import React from "react";
import { Typography, Container, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSelector } from "react-redux"; // ✅ Get user role from Redux

const Unauthorized = () => {
    const navigate = useNavigate();
    const { role } = useSelector((state) => state.auth); // ✅ Check user role

    const handleNavigation = () => {
        if (role === "admin") {
            navigate("/"); // ✅ Admins go home
        } else {
            window.location.href = "http://localhost:5173/loan-dashboard"; // ✅ Non-admins redirected
        }
    };

    return (
        <Container
            maxWidth={false}
            sx={{
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)",
                padding: 0,
            }}
        >
            <Box
                sx={{
                    textAlign: "center",
                    padding: 10,
                    borderRadius: 6,
                    background: "linear-gradient(135deg, #ff4d4d, #ff6666)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
                    maxWidth: "700px",
                    width: "90%",
                    minHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <LockOutlinedIcon sx={{ fontSize: 100, color: "#ffffff", marginBottom: 3 }} />

                <Typography variant="h3" sx={{ fontWeight: "bold", color: "#ffffff", letterSpacing: 1 }}>
                    ❌ Access Denied
                </Typography>

                <Typography variant="h5" sx={{ color: "#ffffff", marginTop: 3 }}>
                    You do not have permission to view this page.
                </Typography>

                {/* 🔹 Go Back Home Button with Role-Based Navigation */}
                <Button
                    variant="contained"
                    sx={{
                        background: "#ffffff",
                        color: "#222",
                        fontWeight: "bold",
                        borderRadius: 3,
                        marginTop: 5,
                        fontSize: "1.2rem",
                        padding: "12px 24px",
                        display: "block",
                        "&:hover": { background: "#f0f0f0" },
                    }}
                    onClick={handleNavigation} // ✅ Uses role-based navigation
                >
                    🔁 Go Back Home
                </Button>
            </Box>
        </Container>
    );
};

export default Unauthorized;
