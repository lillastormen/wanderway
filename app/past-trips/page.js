'use client'

import { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, Paper, Stack } from "@mui/material";
import { Trips } from "../controllers/tripController";

export default function PastTrips() {
    
     const [currentTrips, setCurrentTrips] = useState([]);
     const [pastTrips, setPastTrips] = useState([]);

     useEffect(() => {
        const fetchTrips = async () => {
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                console.log('No user ID found in local storage');
                return;
            }

            console.log('Fetching trips for user ID:', userId);

            const response = await Trips.readTripByUserId(userId);
            if (response.success) {
                const trips = response.data;
                const today = new Date();

                const current = trips.filter(trip => new Date(trip.end_date) >= today);
                const past = trips.filter(trip => new Date(trip.end_date) < today);

                setCurrentTrips(current);
                setPastTrips(past);
            } else {
                console.error('Failed to fetch trips:', response.error)
            }
        };
        fetchTrips();
    }, []);

    return (
        <Box sx={{ padding: 1, margin: '0 auto', backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>Past Trips</Typography>

            {pastTrips.length > 0 ? (
                <List sx={{ marginTop: 2 }}>
                    {pastTrips.map((trip) => (
                        <ListItem key={trip.id} sx={{ padding: 0 }}>
                            <Paper elevation={2} sx={{ padding: 2, width: '100%', marginBottom: 2 }}>
                                <Typography variant="h6">Country: {trip.country}</Typography>
                                <Typography variant="body1">City: {trip.city}</Typography>
                                <Typography variant="body2">Dates: {trip.start_date} - {trip.end_date}</Typography>
                            </Paper>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Box sx={{ padding: 2, backgroundColor: '#fff', borderRadius: 2, marginTop: 2, boxShadow: 1, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                    No past trips available.
                    </Typography>
                </Box>
            )}
        </Box>

    );
   
}