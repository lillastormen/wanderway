'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../components/SearchBar";
import { Gems } from "../controllers/gemController";
import { Box, Typography, Card, CardContent, IconButton, Button, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import HiddenGems from "../components/HiddenGems";


export default function GemLocator() {
    
    const router = useRouter();
    const [selectedCity, setSelectedCity] = useState(""); // To store the selected city

   
    // const handleSearchButtonClick = async (searchTerm) => {
    //     if (searchTerm && searchTerm.length > 1) {
    //         await handleSearch(searchTerm); // Trigger search when button is clicked
    //     }
    // };

    const handleAddGem = () => {
        router.push("/add-gems"); // Navigate to add gems page
    };

    const handleAutocompleteChange = (event, value) => {
        if (value) {
            setSelectedCity(value.label); // Set selected city name
        }
    };

    return (
        <Box sx={{ maxWidth: 800, padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
                        Gem Locator
                    </Typography>
                    
                    <Box sx={{ marginBottom: 2 }}>
                        <SearchBar 
                            // onSearch={handleSearchButtonClick}
                            onAutocompleteChange={handleAutocompleteChange}
                        />
                    </Box>

                    <Button
                        onClick={handleAddGem}
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        size="large"  
                    >
                        {/* <AddIcon /> */}
                        Add new location
                    </Button>

                    <HiddenGems cityName={selectedCity} />
        </Box>
    );
}
