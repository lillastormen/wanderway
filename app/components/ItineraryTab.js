import React from "react";
import { Box, Card, CardContent, Typography } from '@mui/material'
import MarkdownPreview from '@uiw/react-markdown-preview';


export default function ItineraryTab ({ itinerary }) {
    return (
        <Card sx={{ margin: 'auto', padding: 0, marginTop: 2, backgroundColor: '#f5f5f5' }}>
            <CardContent>
            {itinerary ? (
                <Card sx={{ padding: 2, backgroundColor: '#ffffff', boxShadow: 1 }}>
                    <MarkdownPreview
                        source={itinerary} // Render the markdown content
                        wrapperElement={{ 'data-color-mode': 'light' }}
                    />
                </Card>
            ) : (
                <Typography variant="body1">No itinerary information available</Typography>
            )}
            </CardContent>
        </Card>
        );
    };
  
