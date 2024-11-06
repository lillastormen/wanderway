'use client'

import { useEffect, useState } from "react";
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
       
            <div>
                <h2>Past Trips</h2>
                {pastTrips.length > 0 ? (
                    <ul>
                        {pastTrips.map((trip) => (
                            <li key={trip.id}>
                                <p>Country: {trip.country}</p>
                                <p>City: {trip.city}</p>
                                <p>Dates: {trip.start_date} - {trip.end_date}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No past trips available.</p>
                )}
            </div>
        );
   
}