'use client'

import { useState, useEffect } from "react"
import { Users } from "../controllers/userController"
import { Box, Typography, TextField, Button, Stack, Paper } from "@mui/material";

export default function UserAccount() {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [editMode, setEditMode] = useState(false);

    
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

    const handleSave = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('user_id');

        const response = await Users.update(userId, userData);
        if (response.success) {
            console.log('User data updated successfully')
        } else {
            console.error('Failed to updated user data:', response.error)
        }

        setEditMode(false);
    }

    return (
        <Box sx={{ padding: 1, margin: '0 auto', backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h5" paddingTop={2} gutterBottom>Profile</Typography>

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
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={userData.password}
                        onChange={handleFormChange}
                    />
                </Stack>
                <Stack display="flex" direction="row" justifyContent="space-between" spacing={2} sx={{ marginTop: 5 , width: "100%"}}>
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
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography><strong>Name: </strong>{userData.name}</Typography>
                    <Typography><strong>Email: </strong>{userData.email}</Typography>
                    <Typography><strong>Password: </strong>{userData.password}</Typography>
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
