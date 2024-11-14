'use client'

import { useState, useEffect } from "react";
import { Trips } from "../controllers/tripController";
import CityInfo from "../components/CityInfo";
import WeatherInfo from "../components/WeatherInfo";
import ForecastInfo from "../components/ForecastInfo";
import MustSeePlaces from "../components/MustSeePlaces";
import HiddenGems from "../components/HiddenGems";
import { Box, Typography, Button, TextField, Autocomplete } from '@mui/material';
import ItineraryTab from "../components/ItineraryTab";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import LocalSeeOutlinedIcon from '@mui/icons-material/LocalSeeOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import cities from '/data/cities.json'



export default function Trip() {

    // const router = useRouter();
    const [activeTab, setActiveTab] = useState("Itinerary");
    // const [trip, setTrip] = useState({ destination: "Loading...", start_date: "Loading...", end_date: "Loading..."});
    const [activeTrips, setActiveTrips] = useState([]);
    // const [tripEdit, setTripEdit] = useState(false);
    const [editingTripId, setEditingTripId] = useState(null);
    const tabs = ["Itinerary", "City Info", "Weather", "Must see", "Hidden gems"];
 

    const switchTab = () => {
        switch (activeTab) {
            case "Itinerary": 
                return  (
                    <ItineraryTab activeTrips={activeTrips} />
                );
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

            console.log(userId, response);
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

    const handleFormChange = (value, tripId) => {
        setActiveTrips((prevTrips) =>
            prevTrips.map((trip) =>
                trip.id === tripId ? { 
                    ...trip, 
                    city: value?.label || "",
                    country: value?.country || ""
                }
                : trip
            )
        );
    };

    const handleSave = async (e, tripId) => {
        e.preventDefault();
        const tripToUpdate = activeTrips.find((trip) => trip.id === tripId);
        
        const response = await Trips.update(tripId, { 
            ...tripToUpdate,
            city: tripToUpdate.city,
        country: tripToUpdate.country
        });

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
      
        <Box sx={{ padding: 0.5, margin: '0 auto', backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h5" paddingTop={2} gutterBottom>Trip</Typography>

        {activeTrips.length > 0 ? (
            activeTrips.map(trip => (
                <Box key={trip.id} sx={{ marginBottom: 4, padding: 2, backgroundColor: '#ffffff', borderRadius: 1, boxShadow: 1 }}>
                    {editingTripId === trip.id ? (
                        <form onSubmit={(e) => handleSave(e, trip.id)}>
                            <Autocomplete
                            disablePortal
                            options={cities}
                            getOptionLabel={(option) => `${option.label}, ${option.country}`}
                            value={cities.find(city => city.label === trip.city && city.country === trip.country) || null}
                            onChange={(event, value) => 
                                handleFormChange(value, trip.id)}
                            renderInput={(params) => (
                                <TextField {...params} label="Destination" variant="outlined" fullWidth sx={{ marginBottom: 2 }} />
                            )}
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 1}}>
                            <Box>
                                <Typography variant="h6">{trip.country}, {trip.city}</Typography>
                                <Typography variant="body2">{trip.start_date} - {trip.end_date}</Typography>
                            </Box>
                            <Button 
                                onClick={() => setEditingTripId(trip.id)} 
                                sx={{ 
                                    marginTop: 1,
                                     color: "#555555"

                                }}
                            >
                            <EditOutlinedIcon />
                            </Button>
                        </Box>
                    )}
                </Box>
            ))
        ) : (
            <Typography variant="body1">No active trip available. Please add a new trip.</Typography>
        )}

        {activeTrips.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, marginBottom: 3 }}>
            {["Itinerary", "City Info", "Weather", "Must see", "Hidden gems"]
              .map((tab, index) => (
                <Box key={tab} sx={{ textAlign: 'center' }}>
                  <Button
                    sx={{
                      marginTop: 1,
                      padding: 1.5,
                      '&.MuiButton-outlined': {
                        borderColor: activeTab === tab ? '#1976d2' : '#1976d2',
                      },
                      backgroundColor: activeTab === tab ? 'transparent' : '#1976d2',
                      color: activeTab === tab ? '#1976d2' : '#fff',
                      borderColor: activeTab === tab ? '#1976d2' : '#1976d2',
                    }}
                    onClick={() => setActiveTab(tab)}
                    variant={activeTab === tab ? 'contained' : 'outlined'}
                  >
                 
                    {index === 0 && <MapOutlinedIcon sx={{ fontSize: 45 }} />}
                    {index === 1 && <MapsHomeWorkOutlinedIcon sx={{ fontSize: 45 }} />}
                    {index === 2 && <WbSunnyOutlinedIcon sx={{ fontSize: 45 }} />}
                    {index === 3 && <LocalSeeOutlinedIcon sx={{ fontSize: 45 }} />}
                    {index === 4 && <DiamondOutlinedIcon sx={{ fontSize: 45 }} />}
                  </Button>
        
                  {/* show the label when tab is active */}
                  {activeTab === tab && (
                    <Typography sx={{ fontSize: '12px', marginTop: 0.5, color: '#1976d2', textTransform: 'uppercase' }}>
                      {tab}
                    </Typography>
                  )}
                </Box>
              ))}
          </Box>
        )}

        {activeTrips.length > 0 && <Box>{switchTab()}</Box>}

    </Box>
    );
}