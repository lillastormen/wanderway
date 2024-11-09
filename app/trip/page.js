'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { Trips } from "../controllers/tripController";
// import { useRouter } from "next/navigation";
import CityInfo from "../components/CityInfo";
import WeatherInfo from "../components/WeatherInfo";
import ForecastInfo from "../components/ForecastInfo";
import MustSeePlaces from "../components/MustSeePlaces";
import HiddenGems from "../components/HiddenGems";
import { Box, Typography, Button, Stack, Tabs, Tab, TextField } from '@mui/material';



export default function Trip() {

    // const router = useRouter();
    const [activeTab, setActiveTab] = useState("Intinerary");
    // const [trip, setTrip] = useState({ destination: "Loading...", start_date: "Loading...", end_date: "Loading..."});
    const [activeTrips, setActiveTrips] = useState([]);
    // const [tripEdit, setTripEdit] = useState(false);
    const [editingTripId, setEditingTripId] = useState(null);


    const switchTab = () => {
        switch (activeTab) {
            case "Intinerary": 
                return <Typography variant="body1">Itinerary details go here</Typography>;
            case "City Info":
                return (
                    <Box>
                        {activeTrips.length > 0 ? 
                            <CityInfo cityName={activeTrips[0]?.city} /> : 
                                <p>No city information available</p>
                        }
                    </Box>
                );
            case "Weather":
                return (
                    <>                    
                        <Box>
                            {activeTrips.length > 0 ? 
                                <WeatherInfo cityName={activeTrips[0]?.city} /> : 
                                    <p>No city information available</p>
                            }
                        </Box>
                        <Box>
                            {activeTrips.length > 0 ? 
                                <ForecastInfo cityName={activeTrips[0]?.city} /> : 
                                    <p>No city information available</p>
                            }
                        </Box>
                     </>

                );
            case "Must see":
                return (
                    <Box>
                        {activeTrips.length > 0 ? 
                            <MustSeePlaces cityName={activeTrips[0]?.city} /> : 
                                <p>No city information available</p>
                        }
                    </Box>
                )
            case "Hidden gems":
                return (
                    <Box>
                        {activeTrips.length > 0 ? 
                            <HiddenGems cityName={activeTrips[0]?.city} /> : 
                                <p>No city information available</p>
                        }
                    </Box>
                )
            default:
                return null;
        }
    };

    //fetch the current trip
    useEffect(() => { 
        const fetchActiveTrips = async () => {

            const userId = localStorage.getItem('user_id');
            const response = await Trips.readTripByUserId(userId);

            if (response.success) {
                // const fetchedTrip = response.data;
                const today = new Date();
                const activeTrips = response.data.filter(trip => new Date(trip.end_date) >= today)
                console.log(activeTrips);
                setActiveTrips(activeTrips);
            } else {
                console.log('Failes to fetch trip:', response.error)
            }    
        };

        fetchActiveTrips();
    }, []);

    const handleFormChange = (e, tripId) => {
        const { name, value } = e.target;
        setActiveTrips((prevTrips) =>
            prevTrips.mpa((trip) =>
                trip.id === tripId ? { ...trip, [name]: value } : trip
            )
        );
    };

    const handleSave = async (e, tripId) => {
        e.preventDefault();
        const tripToUpdate = activeTrips.find((trip) => trip.id === tripId);
        const response = await Trips.update(tripId, tripToUpdate);

        if (response.success) {
            console.log('Trip updated successfully!')
            setEditingTripId(false);
        } else {
            console.error('Failed to update the trip:', response.error)
        }
    };

    // //handle adding a new trip
    // const handleAddNewTrip = async (newTripData) => {
    //     const response = await Trips.create(newTripData);
    //     if (response.success && response.data && response.data[0]) {
    //         const newTrip = response.data[0];
    //         setActiveTrips((prevTrips) => [...prevTrips, newTrip]);
    //     } else {
    //         console.error('Failed to add new trip:', response.error)
    //     }
    // }


    return (
        <Box sx={{ padding: 1, margin: '0 auto', backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Trip</Typography>

        {activeTrips.length > 0 ? (
            activeTrips.map(trip => (
                <Box key={trip.id} sx={{ marginBottom: 4, padding: 2, backgroundColor: '#ffffff', borderRadius: 1, boxShadow: 1 }}>
                    {editingTripId === trip.id ? (
                        <form onSubmit={(e) => handleSave(e, trip.id)}>
                            <TextField
                                label="Country"
                                name="country"
                                value={trip.country}
                                onChange={(e) => handleFormChange(e, trip.id)}
                                fullWidth
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                label="City"
                                name="city"
                                value={trip.city}
                                onChange={(e) => handleFormChange(e, trip.id)}
                                fullWidth
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                label="Start Date"
                                name="start_date"
                                type="date"
                                value={trip.start_date}
                                onChange={(e) => handleFormChange(e, trip.id)}
                                fullWidth
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                label="End Date"
                                name="end_date"
                                type="date"
                                value={trip.end_date}
                                onChange={(e) => handleFormChange(e, trip.id)}
                                fullWidth
                                sx={{ marginBottom: 2 }}
                            />
                            <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>Save</Button>
                            <Button variant="outlined" onClick={() => setEditingTripId(false)}>Cancel</Button>
                        </form>
                    ) : (
                        <>
                            <Typography variant="h6">{trip.country}, {trip.city}</Typography>
                            <Typography variant="body2">{trip.start_date} - {trip.end_date}</Typography>
                            <Button onClick={() => setEditingTripId(trip.id)} variant="outlined" color="secondary" sx={{ marginTop: 2 }}>Edit</Button>
                        </>
                    )}
                </Box>
            ))
        ) : (
            <Typography variant="body1">No active trip available. Please add a new trip.</Typography>
        )}

        {activeTrips.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: 4 }}>
                {["Intinerary", "City Info", "Weather", "Must see", "Hidden gems"].map(tab => (
                    <Button key={tab}   sx={{ marginTop: 2 }} onClick={() => setActiveTab(tab)} variant={activeTab === tab ? "contained" : "outlined"}>{tab}</Button>
                ))}
            </Box>
        )}

        {activeTrips.length > 0 && <Box>{switchTab()}</Box>}

    </Box>
    ); 
}