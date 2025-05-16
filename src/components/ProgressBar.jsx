import React from "react";
import { LinearProgress, Box, Typography } from "@mui/material";

const ProgressBar = ({ progress }) => {
    return (
        <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography
                variant="body1"
                gutterBottom
                sx={{ color: "#ffffff", fontWeight: "bold" }}
            >
                {progress.toFixed(2)}% Paid
            </Typography>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: "#76c7c0",
                    },
                }}
            />
        </Box>
    );
};

export default ProgressBar;