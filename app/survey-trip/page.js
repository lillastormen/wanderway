'use client'

import { useEffect, useState } from "react"
import { Trips } from "../controllers/tripController";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import cities from '/data/cities.json'
import dayjs from "dayjs";
import TripForm from "../components/TripForm";


export default function TripSurvey() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const urlUserId = searchParams.get('userId');       
    
    const [formData, setFormData] = useState(); 
    const [loading, setLoading] = useState(false);
   
    useEffect(() => {  
        
        // If user_id is available from the URL, store it in localStorage (this can be done inside state initialization)
        if (urlUserId && !localStorage.getItem('userId')) {
            localStorage.setItem('userId', urlUserId); // Store user_id in localStorage
        }
        setFormData({
            user_id: localStorage.getItem('userId') || urlUserId || '',
            country:'',
            city:'',
            start_date: dayjs(),
            end_date: dayjs(),
            budget:'',
            peace:'',
        })   

    }, [])


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

        setLoading(true);

          // Ensure `user_id` exists
        if (!formData.user_id || formData.user_id === "") {
            console.error("No user ID found. Please create an account first.");
            alert("No user ID found. Please create an account or log in.");
            return;
        }
        const response = await Trips.create(formData);
        
        if (response.success && response.data && response.data) {
            const tripId = response.data.id;
            console.log('Trip created with ID:', tripId);

            //storing generated id in the localstorage
            localStorage.setItem('tripId', tripId);

            router.push(`/itinerary`)
          } else {
            console.error('Failed to add trip:', response.error);
          }
        };

    return (
        <>
            <TripForm 
                isLoading={loading}
                formData={formData}
                handleFormChange={handleFormChange}
                handleDestination={handleDestination}
                handleFormSubmit={handleFormSubmit}
                cities={cities}
            />
        </>
    )
} 

