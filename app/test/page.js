'use client'

import Link from "next/link";
import { Trips } from "../controllers/tripController";
import { Users } from "../controllers/userController";
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
            console.log("Fetched trip:", response.data); 
            setTripId(response.data); 
        } else {
            console.error("Failed to fetch trip:", response.error);
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
        
        const response = await Trips.update(tripId, updatedData);

            if (response.success) {
                console.log('Trip updated successfully:', response.data)
            } else {
                console.error('Failed to update trip:', response.error)
            }
    }
   
    //delete trip
    const handleDeleteTrip = async () => {

        const tripId = 3;

        const response = await Trips.remove(tripId);

            if (response.success) {
                console.log('Trip removed successfully', response.data)
            } else {
                console.error('Failed to delete trip', response.error)
            }
    }
    
    //fetch user by id
    const fetchUserById = async () => {

        // const userId = 18;
        const response = await Users.readUserById(userId)

        if (response.success) {
            console.log('Fetched user:', response.data)
        } else {
            console.error('Failed to fetch user:', response.error)
        }
    }

    //update user
    const userId = 18;
    const updatedData = { name: 'Paulina', email: 'newemail@email.co'}

    const handleUpdateUser = async () => {

        const response = await Users.update(userId, updatedData)

        if (response.success) {
            console.log('User updated:', response.data)
        } else {
            console.error('Failed to update user', response.error)
        }    
    }

    //delete user
    const handleDeleteUser = async () => {

        const response = await Users.remove(userId)

        if (response.success) {
            console.log('User deleted:', response.data)
        } else {
            console.log('Failed to remove user:', response.error)
        }
    }

  return (
    <div>
        <button onClick={handleDeleteUser}>Load User</button>
        
    </div>
   

    )
}