'use client'

import { useState, useEffect, use } from "react";
import { Trips } from "../controllers/tripController";
import CityInfo from "../components/CityInfo";
import WeatherInfo from "../components/WeatherInfo";
import ForecastInfo from "../components/ForecastInfo";
import MustSeePlaces from "../components/MustSeePlaces";
import HiddenGems from "../components/HiddenGems";
import { Box, Typography, Button, TextField, Autocomplete, MenuItem, Select } from '@mui/material';
import ItineraryTab from "../components/ItineraryTab";
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import LocalSeeOutlinedIcon from '@mui/icons-material/LocalSeeOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import cities from '/data/cities.json';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';




export default function Trip() {

    // const router = useRouter();
    const [activeTab, setActiveTab] = useState("Itinerary");
    // const [trip, setTrip] = useState({ destination: "Loading...", start_date: "Loading...", end_date: "Loading..."});
    const [activeTrips, setActiveTrips] = useState([]);
    const [activeTripId, setActiveTripId] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [shouldFetchTrips, setShouldFetchTrips] = useState(false);
    // const [tripEdit, setTripEdit] = useState(false);
    const [editingTripId, setEditingTripId] = useState(null);
    const tabs = ["Itinerary", "City Info", "Weather", "Must see", "Hidden gems", "Edit"];

    const switchTab = () => {

        if(!activeTripId || !selectedTrip) return null;

        switch (activeTab) {
            case "Itinerary": 
                return  (
                    <Box>
                        {/* // <ItineraryTab activeTrips={activeTrips} /> */}
                        <ItineraryTab itinerary={selectedTrip?.itinerary || []} />
                    </Box>
                )
            case "City Info":
                return (
                    <Box>
                        {selectedTrip ? 
                            <CityInfo cityName={selectedTrip.city} /> : 
                                <p>No city information available</p>
                        }
                    </Box>
                );
            case "Weather":
                return (
                    <>                    
                        <Box>
                            {selectedTrip ? 
                                <WeatherInfo cityName={selectedTrip.city} /> : 
                                    <p>No city information available</p>
                            }
                        </Box>
                        <Box>
                            {selectedTrip ? 
                                <ForecastInfo cityName={selectedTrip.city} /> : 
                                    <p>No city information available</p>
                            }
                        </Box>
                     </>

                );
            case "Must see":
                return (
                    <Box>
                        {selectedTrip ? 
                            <MustSeePlaces cityName={selectedTrip.city} /> : 
                                <p>No city information available</p>
                        }
                    </Box>
                )
            case "Hidden gems":
                return (
                    <Box>
                        {selectedTrip  ? 
                            <HiddenGems cityName={selectedTrip.city} /> : 
                                <p>No city information available</p>
                        }
                    </Box>
                )
            case "Edit":
                return (
                    <Box key={selectedTrip.id} sx={{ marginBottom: 4, padding: 2, backgroundColor: '#ffffff', borderRadius: 1, boxShadow: 1 }}>
                        {selectedTrip && 
                           <form onSubmit={(e) => handleSave(e, selectedTrip.id)}>
                        
                                <Autocomplete
                                    disablePortal
                                    options={cities}
                                    getOptionLabel={(option) => `${option.label}, ${option.country}`}
                                    value={cities.find(city => city.label === selectedTrip.city && city.country === selectedTrip.country) || null}
                                    onChange={(event, value) => 
                                        handleFormChange('location', value, selectedTrip.id)}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Destination" variant="outlined" fullWidth sx={{ marginBottom: 2 }} />
                                    )}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Start Date"
                                    value={dayjs(selectedTrip.start_date)}
                                    onChange={(newValue) => handleFormChange('start_date', newValue, selectedTrip.id)}
                                    renderInput={(params) => <TextField {...params} fullWidth sx={{ marginBottom: 2 }} />}
                                />
                                <DatePicker
                                    label="End Date"
                                    value={dayjs(selectedTrip.end_date)}
                                    onChange={(newValue) => handleFormChange('end_date', newValue, selectedTrip.id)}
                                    renderInput={(params) => <TextField {...params} fullWidth sx={{ marginBottom: 2 }} />}
                                />
                            </LocalizationProvider>
                                <Button type="submit" variant="contained" color="primary" sx={{ marginRight: 2 }}>Save</Button>
                                <Button variant="outlined" onClick={() => setEditingTripId(false)}>Cancel</Button>
                            </form> 
                        }
                    </Box>
                )
            break;
            default:
                return null;
        }
    };


    useEffect(() => {
        console.log('asd')
        setActiveTripId(localStorage.getItem('tripId'));
        setShouldFetchTrips(!shouldFetchTrips);
    },[])

    useEffect(() => {
        if(activeTripId && activeTrips){
            localStorage.setItem('tripId', activeTripId);
            setSelectedTrip(activeTrips.find(trip => trip.id == activeTripId));
        }
    }, [activeTripId, activeTrips])

    //fetch the current trip
    useEffect(() => { 
            const fetchActiveTrips = async () => {
            const userId = localStorage.getItem('userId');
            const response = await Trips.readTripByUserId(userId);
            setActiveTripId(localStorage.getItem('tripId'));

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
    }, [shouldFetchTrips]);

    const handleFormChange = (field, value, tripId) => {

        console.log(field, value);

        if(field === 'location'){
            setSelectedTrip( { ...selectedTrip, 'city': value.label, 'country': value.country });
        } else {
            setSelectedTrip( { ...selectedTrip, [field]: value });
        }
        

        // setActiveTrips((prevTrips) =>
        //     prevTrips.map((trip) =>
        //         trip.id === tripId ? { 
        //             ...trip, 
        //             city: value?.label || "",
        //             country: value?.country || ""
        //         }
        //         : trip
        //     )
        // );
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const tripToUpdate = selectedTrip;
        
        const response = await Trips.update(selectedTrip.id, selectedTrip);

        if (response.success) {
            console.log('Trip updated successfully!')
            setEditingTripId(false);
            setShouldFetchTrips(!shouldFetchTrips);
        } else {
            console.error('Failed to update the trip:', response.error)
        }
    };


    return (
      
        <Box sx={{ padding: 0.5, margin: '0 auto', backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h5" paddingTop={2} gutterBottom>Trips</Typography>

        <Box sx={{ marginBottom: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }} color="#30323D" paddingBottom={1}>Active Trip: </Typography>
            <Select
                fullWidth
                value={activeTripId || ""}
                onChange={(e) => setActiveTripId(e.target.value)}
                sx={{
                    backgroundColor: '#ffffff',
                    borderRadius: 1,
                    padding: 1.5,
                    boxShadow: 1,
                    fontSize: '20px',
                    fontWeight: '400',
                    '&.MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#1976d2',
                        },
                        '&:hover fieldset': {
                            borderColor: '#1976d2',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1976d2',
                        }
                    },
                }}
                
            >
        {activeTrips.map((trip) => (
            <MenuItem key={trip.id} value={trip.id}>
                {trip.city}, {trip.country}&nbsp;<br/><Typography variant="body2">({trip.start_date} - {trip.end_date})</Typography>
            </MenuItem>
        ))}
            </Select>
        </Box>
        {selectedTrip && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, marginBottom: 3 }}>
            {tabs
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
                    {index === 0 && <MapOutlinedIcon sx={{ fontSize: 40 }} />}
                    {index === 1 && <MapsHomeWorkOutlinedIcon sx={{ fontSize: 40 }} />}
                    {index === 2 && <WbSunnyOutlinedIcon sx={{ fontSize: 40 }} />}
                    {index === 3 && <LocalSeeOutlinedIcon sx={{ fontSize: 40 }} />}
                    {index === 4 && <DiamondOutlinedIcon sx={{ fontSize: 40 }} />}
                    {index === 5 && <EditOutlinedIcon sx={{ fontSize: 40 }} />}
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