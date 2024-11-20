'use client'

import { Trips } from "../controllers/tripController";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, Paper } from '@mui/material';
import MarkdownPreview from '@uiw/react-markdown-preview';

export default function Itinerary() {

    const router = useRouter();

    const [trip, setTrip] = useState({
        country: "Loading...",
        city: "loading...",
        start_date: "Loading...",
        end_date: "Loading..."
    });
    

    useEffect(() => { 
        const fetchTrip = async () => {
            const tripId = localStorage.getItem('tripId');
            if (!tripId) {
                console.error('No trip ID found in the localstorage');
                return;
            }
    
            const response = await Trips.readById(tripId);
            if (response.success) {
                console.log('Fetched trip:', response.success);
                setTrip(response.data);
            } else {
                console.error('Failed to fetch trip:', response.error)
            }
        };
        fetchTrip();
    }, []);

    
  return (
    <Box sx={{ padding: 2, backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center' }}>
            <Paper 
                sx={{
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h5" gutterBottom >
                    Your Trip
                </Typography>

                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="body1" color="text.primary">
                        <strong>Where:</strong> {trip.country}, {trip.city}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                        <strong>When:</strong> {trip.start_date} - {trip.end_date}
                    </Typography>
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                    {/* <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold' }}>
                        Itinerary:
                    </Typography> */}
                    <MarkdownPreview source={trip.itinerary} wrapperElement={{"data-color-mode": "light"}} />
             
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: '10px'
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => router.push('/trip')}
                        sx={{
                            width: '50%',
                            marginTop: 2,
                            marginBottom: 3,
                            padding: 1.5,
                            fontWeight: 'normal',
                            borderRadius: 1,
                        }}
                    >
                        Next
                    </Button>
                </Box>
            </Paper>
        </Box>
  );
}
