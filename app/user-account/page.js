'use client'

import { useState, useEffect } from "react"
import { Users } from "../controllers/userController"
import { Interests } from "../controllers/interestController"

export default function UserProfile() {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        age_group: "",
        gender: "",
        traveler_type: "",
        interests: []
    });

    const [userInterests, setUserInterests] = useState([]);
    
    useEffect(() => {
        const fetchUserDataAndInterests = async () => {
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                console.error('No user ID found in the local storage');
                return
            }

            const userResponse = await Users.readUserById(userId);
            if (userResponse.success) {
                setUserData(userResponse.data);
            } else {
                console.error('Failed to fetch user:', userResponse.error)
            }

            const interestsResponse = await Interests.readUserInterests(userId);
            if (interestsResponse.success) {
                const interestId = interestsResponse.data.map((item) => item.interest_id);

                const interestNameResponse = await Interests.readInterestsByIds(interestId);
                if (interestNameResponse.success) {
                    setUserInterests(interestNameResponse.data.map((item) => item.interest))
                } else {
                    console.error('Failed to fetch interest name:', interestNameResponse.error);
                }
            } else {
                console.error('Failed to fetch user interests:', interestsResponse.error)
            }
        };
        fetchUserDataAndInterests();
    }, []);
       
    

    return (
        <div>
            <h2>Your use info</h2>
            <div>Name: {userData.name}</div>
            <div>Email: {userData.email}</div>
            <div>Age Group: {userData.age_group}</div>
            <div>Gender: {userData.gender}</div>
            <div>Traveler Type: {userData.traveler_type}</div>
            <div>Interests: {userInterests.length > 0 ? userInterests.join(", ") : "None"}</div>
            
        </div>
    )

}
