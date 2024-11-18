'use client'

import { useState, useEffect } from "react"
import { Users } from "../controllers/userController"
import { Interests } from "../controllers/interestController"
import { Box, Typography, TextField, Select, MenuItem, Checkbox, FormControlLabel, Button, Stack, Paper } from "@mui/material";


export default function UserProfile() {

    const [userData, setUserData] = useState({
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
            const userId = localStorage.getItem('userId');
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
        const userId = localStorage.getItem('userId');

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
            <Typography variant="h5" paddingTop={2} gutterBottom>Profile</Typography>

            {editMode ? (
                <form onSubmit={handleSave}>
                    <Stack spacing={3}>
                        
                        <Select
                            label="Age Group"
                            name="age_group"
                            value={userData.age_group}
                            fullWidth
                            onChange={handleFormChange}
                        >
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
                            <MenuItem value="solo">Solo</MenuItem>
                            <MenuItem value="friends">Friends</MenuItem>
                            <MenuItem value="family">Family</MenuItem>
                        </Select>

                        <Typography variant="subtitle1" >Interests</Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5}}>
                                {allInterests.map((interest) => (
                                    <FormControlLabel
                                        key={interest.id}
                                        control={
                                            <Checkbox
                                                checked={userInterests.includes(interest.id)}
                                                onChange={() =>
                                                    setUserInterests((prev) =>
                                                        prev.includes(interest.id)
                                                            ? prev.filter((id) => id !== interest.id)
                                                            : [...prev, interest.id]
                                                    )
                                                }
                                            />
                                        }
                                        label={interest.interest}
                                    /> 
                                ))}
                            </Box>
                    </Stack>
                    <Stack display="flex" direction="row" justifyContent="space-between" spacing={2} sx={{ marginTop: 4 , width: "100%"}}>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            sx={{ flexGrow: 1 }}
                        >
                            Save
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="primary" 
                            onClick={() => setEditMode(false)}
                            sx={{ flexGrow: 1 }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </form>
            ) : (
                <Paper elevation={3} sx={{ padding: 3 }}>
                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Typography><strong>Age Group: </strong>{userData.age_group}</Typography>
                        <Typography><strong>Gender: </strong> {userData.gender}</Typography>
                        <Typography><strong>Traveler Type: </strong> {userData.traveler_type}</Typography>
                        <Typography>
                            <strong>Interests: </strong>{userInterests.length > 0 
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', paddingTop: 3 }}>
                    <Button
                            color="primary"
                            size="large"
                            variant="contained" 
                            sx={{
                                fontWeight: "normal",
                                width: '50%',
                                margin: '0 auto',
                                borderRadius: 1,
                                marginTop: 2,
                                marginBottom: 3,
                                backgroundColor: '#1976d2',
                                }}
                            onClick={() => setEditMode(true)}
                        >
                            Edit
                        </Button>
                    </Box>
                </Paper>
            )}
        </Box>
    );
}


