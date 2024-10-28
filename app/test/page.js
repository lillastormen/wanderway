'use client'

import Link from "next/link";
import { Trips } from "../controllers/tripController";
import { useState, useEffect } from "react";

export default function Test() {

  
    //fetch all trips
    const [trips, setTrips] = useState([]); // Optional: store trips if needed later

    const fetchTrips = async () => {
        const response = await Trips.readAll();

        if (response.success) {
            console.log("Fetched trips:", response.data); 
            setTrips(response.data); 
        } else {
            console.error("Failed to fetch trips:", response.error);
        }
    };


    //fetch trip by id
    // const [tripId, setTripId] = useState("");

    const fetchTripById = async () => {

        // const tripId = 8;
        const response = await Trips.readById(tripId);

        if (response.success) {
            console.log("Fetched trips:", response.data); 
            setTripId(response.data); 
        } else {
            console.error("Failed to fetch trips:", response.error);
        }
    }


    //fetch by user id
    // const userId = 14;

    const fetchTripsByUserId = async () => {

        const response = await Trips.readByUserId(userId);

        if (response.success) {
            console.log('Fetched trips for this user:', response.data);
            setTrips(response.data);
        } else {
            console.log('Failed to fetch trips:', response.error);
        }

    }

    //update the trip
    const handleUpdateTrip = async () => {

    // const tripId = 5;
        const updatedData = { destination: "Majorka", start_date: "2024-05-01", end_date: "2024-06-01"};
        
        Trips.update(tripId, updatedData)
            if (response.success) {
                console.log('Trip updated successfully:', response.data)
            } else {
                console.error('Failed to update trip:', response.error)
            }
    }
   

    const handleDeleteTrip = async () => {

        const tripId = 3;
        const response = await Trips.remove(tripId);

        Trips.remove(tripId)
            if (response.success) {
                console.log('Trip removed successfully', response.data)
            } else {
                console.error('Failed to delete trip', response.error)
            }
    }
    

  return (
    <div>
        <button onClick={handleDeleteTrip}>Load Trips</button>
        
    </div>
   

    )
}