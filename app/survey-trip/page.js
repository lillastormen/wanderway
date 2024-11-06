'use client'

import { useState, useEffect } from "react"
import { Trips } from "../controllers/tripController";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import cities from '/data/cities.json'
import { TextField, Autocomplete } from "@mui/material";
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
        
        if (response.success && response.data && response.data[0]) {
            const tripId = response.data[0].id;
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
<h2>Trip info</h2>
<form>
    <div>
        <p>Destination</p>
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
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="City" />}
            />
    </div>
        {/* <p>Country</p>
        <input 
          type="text" 
          id="country" 
          name="country" 
          value={formData.country} 
          onChange={handleFormChange}
          />   */}
   
    {/* <div>
        <p>City</p>
        <input 
          type="text" 
          id="city" 
          name="city" 
          value={formData.city} 
          onChange={handleFormChange}
          />  
    </div> */}
    <div>
    <p>Start Date</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                value={formData.start_date}
                                onChange={(newValue) => setFormData({ ...formData, start_date: newValue })}
                                views={['year', 'month', 'day']}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </div>

                <div>
                    <p>End Date</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                value={formData.end_date}
                                onChange={(newValue) => setFormData({ ...formData, end_date: newValue })}
                                views={['year', 'month', 'day']}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
    </div>
    <div>
        <p>Budget</p>
        <div>
            <input
                type="radio"
                id="explorer"
                name="budget"
                value="explorer"
                onChange={handleFormChange}  // Added the handler
            />
            <label htmlFor="explorer">Explorer</label>
        </div>
        <div>
            <input
                type="radio"
                id="comfort"
                name="budget"
                value="comfort"
                onChange={handleFormChange}  // Added the handler
            />
            <label htmlFor="comfort">Comfort</label>
        </div>
        <div>
            <input
                type="radio"
                id="indulge"
                name="budget"
                value="indulge"
                onChange={handleFormChange}  // Added the handler
            />
            <label htmlFor="indulge">Indulge</label>
        </div>  
        
    </div>
    <div> 
        <p>Peace</p>
        <div>
            <input
                type="radio"
                id="relaxed"
                name="peace"
                value="relaxed"
                onChange={handleFormChange}  
            />
            <label htmlFor="relaxed">Relaxed</label>  
        </div>
        <div>
            <input
                type="radio"
                id="adventurer"
                name="peace"
                value="adventurer"
                onChange={handleFormChange}  
            />
            <label htmlFor="adventurer">Adventurer</label>
        </div>
        <div>
            <input
                type="radio"
                id="thrill-seeker"
                name="peace"
                value="thrill-seeker"
                onChange={handleFormChange}  
            />
            <label htmlFor="thrill-seeker">Thrill-seeker</label>
        </div>
    </div>
    <button 
        className="border-solid border-"
        onClick={handleFormSubmit}
    >
        <p>Ready!</p>
    </button>
      
</form>

</>
)
}