import React from "react";
import { Box, Paper, Typography } from '@mui/material'
import MarkdownPreview from '@uiw/react-markdown-preview';


export default function ItineraryTab ({ activeTrips }) {
    return (
        <Box>
            {activeTrips ? (
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', borderRadius: 2, marginTop: 2 }}>
                    <MarkdownPreview
                        source={activeTrip.itinerary} // Render the markdown content
                        wrapperElement={{ 'data-color-mode': 'light' }}
                    />
                </Paper>
            ) : (
            <Typography variant="body1">No itinerary information available</Typography>
            )}
        </Box>
        );
    };
  
