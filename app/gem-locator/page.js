'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../components/SearchBar";
import { Gems } from "../controllers/gemController";
import { Box, Typography, Card, CardContent, IconButton, Button, Stack } from '@mui/material';

import HiddenGems from "../components/HiddenGems";


export default function GemLocator() {
    
    const router = useRouter();
    const [selectedCity, setSelectedCity] = useState(""); // To store the selected city

    const handleAddGem = () => {
        router.push("/add-gems"); // Navigate to add gems page
    };

    const handleAutocompleteChange = (event, value) => {
        if (value) {
            setSelectedCity(value.label); // Set selected city name
        }
    };

    return (
        <Box sx={{ padding: 1, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h5" paddingTop={2}>
                Hidden Gems
            </Typography>
            <Typography variant="body2" paddingTop={1} paddingBottom={1} gutterBottom>
                Search: 
            </Typography>
                    
                    <Box sx={{ marginBottom: 2 }}>
                        <SearchBar 
                            onAutocompleteChange={handleAutocompleteChange}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', paddingTop: 3 }}>
                        <Button
                            onClick={handleAddGem}
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                width: '60%',
                                margin: '0 auto',
                                borderRadius: 1,
                                marginTop: 2,
                                marginBottom: 3,
                                backgroundColor: '#1976d2',
                            }}
                            >
                            Add New Location
                        </Button>
                    </Box>

                    <HiddenGems cityName={selectedCity} />
        </Box>
    );
}
