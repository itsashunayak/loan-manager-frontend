import React from 'react';
import { Typography, Container } from '@mui/material';

const Unauthorized = () => {
    return (
        <Container>
            <Typography variant="h4" color="error" align="center" sx={{ mt: 4 }}>
                Unauthorized Access
            </Typography>
            <Typography align="center" sx={{ mt: 2 }}>
                You do not have permission to view this page.
            </Typography>
        </Container>
    );
};

export default Unauthorized;
