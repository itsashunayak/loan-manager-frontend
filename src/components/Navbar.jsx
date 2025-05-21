// Navbar.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, firstName } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect to login after logout
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={6}
      sx={{
        background: "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
        boxShadow:
          "0 3px 5px 2px rgba(33, 203, 243, .3), 0 0 15px 5px rgba(33, 203, 243, 0.2)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 2, md: 6 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "white",
            fontWeight: "bold",
            gap: 1,
          }}
          onClick={() => navigate("/")}
        >
          <AutoAwesomeIcon sx={{ fontSize: 28 }} />
          <Typography variant="h5" component="div" sx={{ userSelect: "none" }}>
            MyApp
          </Typography>
        </Box>

        <Box>
          {token ? (
            <>
              <Typography
                variant="body1"
                component="span"
                sx={{
                  marginRight: 3,
                  color: "rgba(255, 255, 255, 0.85)",
                  fontWeight: 500,
                }}
              >
                Hi, {firstName}!
              </Typography>

              <Button
                variant="outlined"
                color="inherit"
                onClick={handleProfile}
                sx={{
                  marginRight: 1,
                  borderColor: "rgba(255, 255, 255, 0.7)",
                  color: "white",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderColor: "white",
                    boxShadow:
                      "0 0 8px 2px rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                Profile
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow:
                    "0 3px 5px 2px rgba(255, 64, 129, .3)",
                  background:
                    "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
                    boxShadow:
                      "0 6px 10px 4px rgba(255, 64, 129, .5)",
                  },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogin}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                background:
                  "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                boxShadow:
                  "0 3px 5px 2px rgba(255, 64, 129, .3)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
                  boxShadow:
                    "0 6px 10px 4px rgba(255, 64, 129, .5)",
                },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
