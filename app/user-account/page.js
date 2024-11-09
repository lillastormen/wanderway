'use client'

import { useState, useEffect } from "react"
import { Users } from "../controllers/userController"
import { Interests } from "../controllers/interestController"
import { Box, Typography, TextField, Select, MenuItem, Checkbox, FormControlLabel, Button, Stack, Paper } from "@mui/material";

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
        <Box sx={{ padding: 1, margin: '0 auto', backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>Your Profile</Typography>

            {editMode ? (
                <form onSubmit={handleSave}>
                    <Stack spacing={3}>
                        <TextField
                            label="Name"
                            name="name"
                            variant="outlined"
                            fullWidth
                            value={userData.name}
                            onChange={handleFormChange}
                        />
                        <TextField
                            label="E-mail"
                            name="email"
                            variant="outlined"
                            fullWidth
                            value={userData.email}
                            onChange={handleFormChange}
                        />
                        <Select
                            label="Age Group"
                            name="age_group"
                            value={userData.age_group}
                            fullWidth
                            onChange={handleFormChange}
                        >
                            <MenuItem value="">Select Your Age Group</MenuItem>
                            <MenuItem value="-25">-25</MenuItem>
                            <MenuItem value="25-31">25-31</MenuItem>
                            <MenuItem value="32-38">32-38</MenuItem>
                            <MenuItem value="39-45">39-45</MenuItem>
                            <MenuItem value="45+">45+</MenuItem>
                        </Select>
                        <Select
                            label="Gender"
                            name="gender"
                            value={userData.gender}
                            fullWidth
                            onChange={handleFormChange}
                        >
                            <MenuItem value="">Select Your Gender</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="non-binary">Non-binary</MenuItem>
                            <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                        </Select>
                        <Select
                            label="Traveler Type"
                            name="traveler_type"
                            value={userData.traveler_type}
                            fullWidth
                            onChange={handleFormChange}
                        >
                            <MenuItem value="">Select Your Traveler Type</MenuItem>
                            <MenuItem value="solo">Solo</MenuItem>
                            <MenuItem value="friends">Friends</MenuItem>
                            <MenuItem value="family">Family</MenuItem>
                        </Select>

                        <Typography variant="subtitle1">Interests</Typography>
                        {allInterests.length > 0 ? (
                            allInterests.map((interest) => (
                                <FormControlLabel
                                    key={interest.id}
                                    control={
                                        <Checkbox
                                            checked={userInterests.includes(interest.id)}
                                            onChange={handleInterestsFormChange}
                                            value={interest.id}
                                        />
                                    }
                                    label={interest.interest}
                                />
                            ))
                        ) : (
                            <Typography>Loading interests...</Typography>
                        )}
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ marginTop: 3 }}>
                        <Button type="submit" variant="contained" color="primary">Save</Button>
                        <Button variant="outlined" color="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
                    </Stack>
                </form>
            ) : (
                <Paper elevation={3} sx={{ padding: 3 }}>
                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography >Name: {userData.name}</Typography>
                        <Typography>Email: {userData.email}</Typography>
                        <Typography>Age Group: {userData.age_group}</Typography>
                        <Typography>Gender: {userData.gender}</Typography>
                        <Typography>Traveler Type: {userData.traveler_type}</Typography>
                        <Typography>
                            Interests: {userInterests.length > 0 
                                ? userInterests
                                    .map((id) => {
                                        const interest = allInterests.find((item) => item.id === id);
                                        return interest ? interest.interest : '';
                                    })
                                    .filter(Boolean)
                                    .join(", ")
                                : "None"}
                        </Typography>
                    </Box>
                    <Button 
                        color="primary"
                        size="large"
                        variant="contained" 
                        sx={{ marginTop: 2 }} 
                        onClick={() => setEditMode(true)}
                    >
                        Edit
                    </Button>
                </Paper>
            )}
        </Box>
    );
}
