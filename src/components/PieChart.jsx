import React from "react";
import { Pie } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

// Register required chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ paidAmount, totalAmount }) => {
    const remainingAmount = totalAmount - paidAmount;

    const data = {
        labels: ["Paid Amount", "Remaining Amount"],
        datasets: [
            {
                data: [paidAmount, remainingAmount],
                backgroundColor: ["#76c7c0", "#e0e0e0"],
                hoverBackgroundColor: ["#5aa9a3", "#c0c0c0"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box sx={{ width: "100%", textAlign: "center", marginTop: 2 }}>
            <Typography
                variant="h6"
                gutterBottom
                sx={{ color: "#ffffff", fontWeight: "bold" }}
            >
                Loan Repayment Status
            </Typography>
            <Pie data={data} />
            <Typography
                variant="body1"
                sx={{ color: "#ffffff", marginTop: 2 }}
            >
                Paid: ₹{paidAmount.toLocaleString()} | Remaining: ₹{remainingAmount.toLocaleString()}
            </Typography>
        </Box>
    );
};

export default PieChart;