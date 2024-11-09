'use client'

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Gems } from "../controllers/gemController";
import { TextField, Button, Box, Typography, Stack, Autocomplete } from "@mui/material";
import cities from '/data/cities.json'


export default function addGem() {

    const router = useRouter();
    const [formData, setFormData] = useState({
        user_id: '',
        name:'',
        country:'',
        city:'',
        location:'',
        description:'',
        picture: '',
    });

    useEffect(() => {
        // Run this code only on the client side
        if (typeof window !== "undefined") {
            const userId = localStorage.getItem('user_id');
            if (userId) {
                setFormData((prevData) => ({ ...prevData, user_id: userId }));
            }
        }
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const response = await Gems.create(formData);

        if (response.success) {
            console.log('Gem addes successfully!');
            setFormData({
                //resting the form
                user_id: localStorage.getItem('user_id') || '',
                name: '',
                country: '',
                city: '',
                location: '',
                description: '',
                picture: '',
            });
            router.push("/gem-locator")
        } else {
            console.error('Failed to add gem:', response.error)
        }
    };

    return (
        <Box sx={{ maxWidth: 400, padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
                Add New Gem
            </Typography>
            <form onSubmit={handleFormSubmit}>
                <Stack spacing={1}>
                    <TextField 
                        label="Name" 
                        variant="outlined" 
                        fullWidth 
                        required
                        name="name" 
                        value={formData.name} 
                        onChange={handleFormChange} 
                    />
                      <Autocomplete
                        disablePortal
                        options={cities}
                        getOptionLabel={(option) => `${option.label}, ${option.country}`} // Combine city and country
                        onChange={(event, value) => {
                            setFormData((prevData) => ({
                                ...prevData,
                                city: value ? value.label : '',
                                country: value ? value.country : ''
                            }));
                        }}
                        renderInput={(params) => (
                            <TextField 
                                {...params}
                                label="City, Country"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                    {/* <TextField 
                        label="Country" 
                        variant="outlined" 
                        fullWidth 
                        required
                        name="country" 
                        value={formData.country} 
                        onChange={handleFormChange} 
                    />
                    <TextField 
                        label="City" 
                        variant="outlined" 
                        fullWidth 
                        required
                        name="city" 
                        value={formData.city} 
                        onChange={handleFormChange} 
                    /> */}
                    <TextField 
                        label="Location" 
                        variant="outlined" 
                        fullWidth 
                        required
                        name="location" 
                        value={formData.location} 
                        onChange={handleFormChange} 
                    />
                    <TextField 
                        label="Description" 
                        variant="outlined" 
                        fullWidth 
                        required
                        name="description" 
                        value={formData.description} 
                        onChange={handleFormChange} 
                    />
                    <TextField 
                        label="Picture URL" 
                        variant="outlined" 
                        fullWidth 
                        required
                        name="picture" 
                        value={formData.picture} 
                        onChange={handleFormChange} 
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        size="large"
                    >
                        Add
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}
   