'use client'

import { useState } from "react"
import { Trips } from "../controllers/tripController";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import cities from '/data/cities.json'
import dayjs from "dayjs";
import TripForm from "../components/TripForm";


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
        console.log(e.target.name, e.target.value);
        setFormData({
            ...formData, //Keep the exsisting data in the FormData state
            [e.target.name]: e.target.value //Update only the field that changed
        });
        console.log(formData);
    };

    const handleDestination = (e) => {
        setFormData({
            ...formData, //Keep the exsisting data in the FormData state
            city: e.city, //Update only the field that changed
            country: e.country,
        });
    }

    //Handle form submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();

          // Ensure `user_id` exists
        if (!formData.user_id || formData.user_id === "") {
            console.error("No user ID found. Please create an account first.");
            alert("No user ID found. Please create an account or log in.");
            return;
        }
        console.log(formData);
        const response = await Trips.create(formData);

        console.log("Trip creation response:", response);
        
        if (response.success && response.data && response.data) {
            const tripId = response.data.id;
            console.log('Trip created with ID:', tripId);

            //storing generated id in the localstorage
            localStorage.setItem('trip_id', tripId);

            router.push(`/itinerary`)
          } else {
            console.error('Failed to add trip:', response.error);
          }
        };
 


console.log(cities);

return (
    <>
        <TripForm 
            formData={formData}
            handleFormChange={handleFormChange}
            handleDestination={handleDestination}
            handleFormSubmit={handleFormSubmit}
            cities={cities}
        />
    </>
)
} 

