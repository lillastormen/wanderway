'use client'

import { Trips } from "../controllers/tripController";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Intinerary() {

    const router = useRouter();
    const [trip, setTrip] = useState({
        destination: "Loading...",
        start_date: "Loading...",
        end_date: "Loading..."
    });
    

    useEffect(() => { 
        const fetchTrip = async () => {
            const tripId = localStorage.getItem('trip_id');
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
    <div>
        <h2>Your Trip</h2>
            <div>Where: {trip.destination}</div>
            <div>When: {trip.start_date} - {trip.end_date}</div>
        <div>Intinerary</div>
        <div>
            <div>Day 1</div>
            <div>Day 2</div>
            <div>Day 3</div>
        </div>
       
            <button 
                className="border-solid border-2"
                onClick={() => router.push('/trip')}    
            >
            <p>Next</p>
            </button>
        
       
    </div>
  );
}
