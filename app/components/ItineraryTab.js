import React from "react";
import { Box, Paper, Typography } from '@mui/material'
import MarkdownPreview from '@uiw/react-markdown-preview';


export default function ItineraryTab ({ activeTrips }) {
    return (
        <Box>
            {activeTrips.length > 0 ? (
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                {/* Render the itinerary as markdown */}
                <MarkdownPreview
                source={activeTrips[0].itinerary}
                wrapperElement={{ "data-color-mode": "light" }} 
                />
            </Paper>
            ) : (
            <Typography variant="body1">No itinerary information available</Typography>
            )}
        </Box>
        );
    };
  
