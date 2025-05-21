import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserDetails } from "../redux/slices/authSlice";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Fade,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CakeIcon from "@mui/icons-material/Cake";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const iconMap = {
  name: <AccountCircleIcon sx={{ mr: 1, color: "#ffeb3b" }} />,
  dob: <CakeIcon sx={{ mr: 1, color: "#ffeb3b" }} />,
  email: <EmailIcon sx={{ mr: 1, color: "#ffeb3b" }} />,
  phone: <PhoneIcon sx={{ mr: 1, color: "#ffeb3b" }} />,
  salary: <MonetizationOnIcon sx={{ mr: 1, color: "#ffeb3b" }} />,
  walletAmount: <MonetizationOnIcon sx={{ mr: 1, color: "#ffeb3b" }} />,
  address: <LocationOnIcon sx={{ mr: 1, color: "#ffeb3b" }} />,
};

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId, token, userDetails, loading, error } = useSelector(
    (state) => state.auth
  );

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

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
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #667eea, #764ba2, #6b8dd6)",
          overflowX: "hidden",
        }}
      >
        <CircularProgress sx={{ color: "#fff" }} thickness={5} size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #667eea, #764ba2, #6b8dd6)",
          px: 2,
          textAlign: "center",
          overflowX: "hidden",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#f44336",
            fontWeight: "bold",
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            userSelect: "none",
          }}
        >
          {error}
        </Typography>
      </Box>
    );
  }

  const formatLabel = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const hiddenFields = ["id", "password", "role"];

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
        width: "100vw",
        background:
          "linear-gradient(135deg, #667eea, #764ba2, #6b8dd6)",
        color: "#fff",
        px: { xs: 3, sm: 6, md: 10 },
        py: { xs: 6, sm: 10 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto",
        boxSizing: "border-box",
      }}
    >
      {/* Floating avatar */}
      <Box
        sx={{
          bgcolor: "rgba(255,255,255,0.15)",
          borderRadius: "50%",
          p: 1,
          mb: { xs: 4, sm: 5 },
          boxShadow: "0 0 20px 3px rgba(255, 235, 59, 0.6)",
          color: "#ffeb3b",
          fontSize: { xs: 60, sm: 80 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          animation: "bounce 2s ease-in-out infinite alternate",
          "@keyframes bounce": {
            "0%": { transform: "translateY(0)" },
            "100%": { transform: "translateY(-20px)" },
          },
        }}
      >
        <AccountCircleIcon sx={{ fontSize: { xs: 60, sm: 80 } }} />
      </Box>

      <Fade in={visible} timeout={1200}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 900,
            boxSizing: "border-box",
            overflowWrap: "break-word",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 900,
              textAlign: "center",
              letterSpacing: 1.5,
              mb: { xs: 4, sm: 6 },
              textShadow: "0 2px 6px rgba(0,0,0,0.4)",
              fontSize: { xs: "2rem", sm: "3rem" },
            }}
          >
            User Profile
          </Typography>

          <Grid container spacing={{ xs: 3, sm: 4 }}>
            {Object.entries(userDetails)
              .filter(([key]) => !hiddenFields.includes(key))
              .map(([key, value]) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={key}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    wordBreak: "break-word",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      mb: 1,
                      color: "#ffeb3b",
                      display: "flex",
                      alignItems: "center",
                      textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                      wordBreak: "break-word",
                    }}
                  >
                    {iconMap[key] || (
                      <AccountCircleIcon
                        sx={{ mr: 1, color: "#ffeb3b", opacity: 0.5 }}
                      />
                    )}
                    {formatLabel(key)}:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      color: "#fff",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      wordBreak: "break-word",
                    }}
                  >
                    {formatValue(key, value)}
                  </Typography>
                </Grid>
              ))}
          </Grid>

          <Box
            mt={6}
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap={2}
            sx={{ overflowWrap: "break-word" }}
          >
            <Button
              variant="text"
              onClick={() => navigate(-1)}
              sx={{
                color: "#ffeb3b",
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: 2,
                px: 4,
                py: 1.2,
                border: "2px solid #ffeb3b",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: "#ffeb3b",
                  color: "#3a2d00",
                },
              }}
            >
              Back to Dashboard
            </Button>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default Profile;
