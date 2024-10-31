'use client'

import { useState, useEffect } from "react"
import { Users } from "../controllers/userController"

export default function UserProfile() {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        age_group: "",
        gender: "",
        traveler_type: "",
        interests: []
    })
    
    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                console.error('No user ID found in the local storage');
                return
            }

            const response = await Users.readUserById(userId);
            if (response.success) {
                setUserData(response.data);
            } else {
                console.error('Failed to fetch user:', response.error)
            }
        };
        fetchUserData();
    }, []);
       
    

    return (
        <div>
            <h2>Your use info</h2>
            <div>Name: {userData.name}</div>
            <div>Email: {userData.email}</div>
            <div>Age Group: {userData.age_group}</div>
            <div>Gender: {userData.gender}</div>
            <div>Traveler Type: {userData.traveler_type}</div>
            
        </div>
    )

}
