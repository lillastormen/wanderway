import React from "react";
import { Box, Typography } from '@mui/material';
 
export default function Info() {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Welcome! 
            </Typography>
            <Typography variant="body1">
            Wanderway aims to be the ultimate travel companion, designed to turn travelling ideas into a fully personalized adventure. At the moment app allows you to create the itinerary tailored to your budget, your interests, and even the kind of traveler you are — whether you’re a beach bum, history buff, or thrill-seeker! Wanderway intuitively suggests destinations and activities that match your expectations.
            </Typography>
            <Box 
                sx={{
                    padding: '10px',
                    textAlign: 'center',
                    backgroundColor: '#f5f5f5',
                    position: 'absolute',
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
            <Typography variant="body2" color="textSecondary">
                © 2024 Karolina Limanowska. All rights reserved.
            </Typography>
            </Box>
        </Box>
    );
}