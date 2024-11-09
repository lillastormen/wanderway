'use client'

import { useState, useEffect } from "react"
import { Trips } from "../controllers/tripController";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import cities from '/data/cities.json'
import { TextField, Autocomplete, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Box, Typography, Button, Stack } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";


export default function TripSurvey() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const urlUserId = searchParams.get('user_id');

    const [formData, setFormData] = useState({
        user_id: localStorage.getItem('user_id') || urlUserId || '',
        country:'',
        city:'',
        start_date: dayjs(),
        end_date: dayjs(),
        budget:'',
        peace:'',
    });

    // If user_id is available from the URL, store it in localStorage (this can be done inside state initialization)
    if (urlUserId && !localStorage.getItem('user_id')) {
        localStorage.setItem('user_id', urlUserId); // Store user_id in localStorage
    }

    //Handle form data change
    const handleFormChange = (e) => {
        setFormData({
        ...formData, //Keep the exsisting data in the FormData state
        [e.target.name]: e.target.value //Update only the field that changed
    });
    };

    //Handle form submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();

          // Ensure `user_id` exists
        if (!formData.user_id || formData.user_id === "") {
            console.error("No user ID found. Please create an account first.");
            alert("No user ID found. Please create an account or log in.");
            return;
        }

        const response = await Trips.create(formData);

        console.log("Trip creation response:", response);
        
        if (response.success && response.data && response.data) {
            const tripId = response.data.id;
            console.log('Trip created with ID:', tripId);

            //storing generated id in the localstorage
            localStorage.setItem('trip_id', tripId);

            router.push(`/intinerary`)
          } else {
            console.error('Failed to add trip:', response.error);
          }
        };
 


console.log(cities);

return (
    <>


    <Box sx={{ padding: 1, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Trip Info</Typography>
        
        <form onSubmit={handleFormSubmit}>
            <Stack spacing={3}>
        <Box>
            <Typography variant="body2" fontWeight="bold">Destination</Typography>
            <Autocomplete
                disablePortal
                options={cities}
                getOptionLabel={(option) => `${option.label}, ${option.country}`}
                onChange={(event, value) => {
                    // Update formData with selected city and its country
                    setFormData({
                    ...formData,
                    city: value?.label || "",
                    country: value?.country || "",
                    });
                }}
                
                renderInput={(params) => <TextField {...params} label="City, Country" variant="outlined" fullWidth />}
            />
        </Box>
        <Box>
            <Typography variant="body2" fontWeight="bold">Start Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        value={formData.start_date}
                        onChange={(newValue) => setFormData({ ...formData, start_date: newValue })}
                        views={['year', 'month', 'day']}
                        renderInput={(params) => <TextField {...params} label="Start Date" variant="outlined" fullWidth />}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </Box>
        <Box>
            <Typography variant="body2" fontWeight="bold">End Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        value={formData.end_date}
                        onChange={(newValue) => setFormData({ ...formData, end_date: newValue })}
                        views={['year', 'month', 'day']}
                        renderInput={(params) => <TextField {...params} label="End Date" variant="outlined" fullWidth/>}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </Box>
        <Box>
            <Typography variant="body2" fontWeight="bold">Budget</Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    name="budget"
                    value={formData.budget}
                    onChange={handleFormChange}
                >
                    <FormControlLabel
                        value="explorer"
                        control={<Radio />}
                        label="Explorer"
                    />
                    <FormControlLabel
                        value="comfort"
                        control={<Radio />}
                        label="Comfort"
                    />
                    <FormControlLabel
                        value="indulge"
                        control={<Radio />}
                        label="Indulge"
                    />
                </RadioGroup>
            </FormControl>
        </Box>
        <Box>
            <Typography variant="body2" fontWeight="bold">Peace</Typography>
            <FormControl component="fieldset">
                <RadioGroup
                    name="peace"
                    value={formData.peace}
                    onChange={handleFormChange}
                >
                    <FormControlLabel
                        value="relaxed"
                        control={<Radio />}
                        label="Relaxed"
                    />
                    <FormControlLabel
                        value="adventurer"
                        control={<Radio />}
                        label="Adventurer"
                    />
                    <FormControlLabel
                        value="thrill-seeker"
                        control={<Radio />}
                        label="Thrill-seeker"
                    />
                </RadioGroup>
            </FormControl>
        </Box>
        <Button 
            variant="contained" 
            type="submit"
            onClick={handleFormSubmit} 
            color="primary"
            size="large"
            sx={{ marginTop: 2 }} 
        >
            Ready!
        </Button>
        </Stack>
        </form>
    </Box>

</>
)
}