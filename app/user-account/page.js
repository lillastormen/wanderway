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
    const [editMode, setEditMode] = useState(false);
    const [allInterests, setAllInterests] = useState([]);
    
    useEffect(() => {
        const fetchUserDataAndInterests = async () => {
            const userId = localStorage.getItem('user_id');
            if (!userId) {
                console.error('No user ID found in the local storage');
                return
            }

             //fetch user data
            const userResponse = await Users.readUserById(userId);
            if (userResponse.success) {
                setUserData(userResponse.data);
            } else {
                console.error('Failed to fetch user:', userResponse.error)
            }

            //fetch user interest
            const interestsResponse = await Interests.readUserInterests(userId);
            if (interestsResponse.success) {
                const interestId = interestsResponse.data.map((item) => item.interest_id);

                if (interestId.length > 0) {
                const interestNameResponse = await Interests.readInterestsByIds(interestId);
                if (interestNameResponse.success) {
                    setUserInterests(interestId)
                } else {
                    console.error('Failed to fetch interest name:', interestNameResponse.error);
                }
            }

                //fetch all avaiable interests
                const allInterestsResponse = await Interests.readAll();
                if (allInterestsResponse.success) {
                    setAllInterests(allInterestsResponse.data)
                } else {
                    console.error('Failed to fetch all interests:', allInterestsResponse.error)
                }
            } else {
                console.error('Failed to fetch user interests:', interestsResponse.error)
            }
        };
        fetchUserDataAndInterests();
    }, []);
       
    //handle form change for updating user data
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    //handle form change for interests
    // const handleInterestsFormChange = (e) => {
    //     const { value, checked } = e.target;
    //     if (checked) {
    //         setUserInterests((prevInterests) => [...prevInterests, parseInt(value)]);
    //     } else {
    //         setUserInterests((prevInterests) => prevInterests.filter((interest) => interest !== parseInt(value)))
    //     }
    // };
    const handleInterestsFormChange = (e) => {
        const interestId = parseInt(e.target.value, 10); 
        if (e.target.checked) {
            // Add interest if checked
            setUserInterests((prev) => {
                if (!prev.includes(interestId)) {
                    return [...prev, interestId];
                }
                return prev;
            });    
        } else {
            // Remove interest if unchecked
            setUserInterests((prev) => prev.filter((id) => id !== interestId)); 
        };
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('user_id');

        const response = await Users.update(userId, userData);
        if (response.success) {
            console.log('User data updated successfully')
        } else {
            console.error('Failed to updated user data:', response.error)
        }

        //update user interets
        const interestsUpdateResponse = await Interests.updateUserInterest(userId, userInterests);
        if (interestsUpdateResponse.success) {
            console.log('User interests updated successfully');
        } else {
            console.error('Failed to update user interests:', interestsUpdateResponse.error)
        }

        setEditMode(false);
    }

    return (
        <div>
            <h2>Your profile</h2>
            {editMode ? (
                <form onSubmit={handleSave}>
                    <div>
                        <label>Name: </label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div>
                        <label>E-mail: </label>
                        <input
                            type="text"
                            name="email"
                            value={userData.email}
                            onChange={handleFormChange}
                        />
                    </div>
                    <div>
                        <label>Age Group: </label>
                        <select 
                            name="age_group"
                            value={userData.age_group}
                            onChange={handleFormChange}
                        >
                            <option value="">Select Your Age Group</option>
                            <option value="-25">-25</option>
                            <option value="25-31">25-31</option>
                            <option value="32-38">32-38</option>
                            <option value="39-45">39-45</option>
                            <option value="45+">45?</option>
                        </select>
                    </div>
                    <div>
                        <label>Gender: </label>
                        <select
                            name="gender"
                            value={userData.gender}
                            onChange={handleFormChange}
                        >
                            <option value="">Select Your Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="non-binary">Non-binary</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                    </div>
                    <div>
                        <label>Traveler Type: </label>
                        <select
                            name="traveler_type"
                            value={userData.traveler_type}
                            onChange={handleFormChange}
                        >
                            <option value="">Select Your Traveler Type</option>
                            <option value="solo">Solo</option>
                            <option value="friends">Friends</option>
                            <option value="family">Family</option>
                        </select>
                    </div>
                    <div>
                        <label>Interests: </label>
                        {allInterests.length > 0 ? (
                            allInterests.map((interest) => (
                                <div key={interest.id}>
                                    <input
                                        type="checkbox"
                                        id={`interest-${interest.id}`}
                                        value={interest.id}
                                        checked={userInterests.includes(interest.id)}
                                        onChange={handleInterestsFormChange}
                                    />
                                    <label htmlFor={`interest-${interest.id}`}>{interest.interest}</label>
                                </div>
                            ))
                        ) : (
                            <p>Loading interests...</p>
                        )}
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                </form>
                ) : (
                <div>
                    <div>Name: {userData.name}</div>
                    <div>Email: {userData.email}</div>
                    <div>Age Group: {userData.age_group}</div>
                    <div>Gender: {userData.gender}</div>
                    <div>Traveler Type: {userData.traveler_type}</div>
                    <div>Interests: {userInterests.length > 0 
                        ? userInterests
                            .map((id) => {
                                const interest = allInterests.find((item) => item.id === id);
                                return interest ? interest.interest : '';
                            })
                            .filter(Boolean) //remove empty strings
                            .join(", ")
                        : "None"}
                    </div>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                </div>
              
            )}
        </div>
    );
}
