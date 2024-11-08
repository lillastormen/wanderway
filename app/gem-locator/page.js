'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../components/SearchBar";
import { Gems } from "../controllers/gemController";
import { Box, Typography, Card, CardContent, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'


export default function GemLocator() {
    
    const router = useRouter();
    const [selectedGems, setSelectedGems] = useState(null);
    const [noResults, setNoResults] = useState(false);
    const [selectedCity, setSelectedCity] = useState(""); // To store the selected city

    const handleSearch = async (searchTerm) => {
        if (searchTerm && searchTerm.length > 1) {
            try {
                const response = await Gems.readGemsByCity(searchTerm); // Fetch gems for selected city
                if (response.success && response.data.length > 0) {
                    setSelectedGems(response.data); // Update gems data
                    setNoResults(false);
                } else {
                    setSelectedGems([]); // No gems found
                    setNoResults(true);
                }
            } catch (error) { 
                console.error('Unexpected error fetching gems: ', error);
                setSelectedGems([]); // Reset gems if error occurs
                setNoResults(true);
            }
        } else {
            setSelectedGems([]); // Clear gems if no search term
            setNoResults(false);
        }
    };

    const handleSearchButtonClick = async (searchTerm) => {
        if (searchTerm && searchTerm.length > 1) {
            await handleSearch(searchTerm); // Trigger search when button is clicked
        }
    };

    const handleAddGem = () => {
        router.push("/add-gems"); // Navigate to add gems page
    };

    const handleAutocompleteChange = (event, value) => {
        if (value) {
            setSelectedCity(value.label); // Set selected city name
            handleSearch(value.label); // Trigger search for gems in that city
        }
    };

    return (
        <Box sx={{ maxWidth: 400, padding: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
                        Gem Locator
                    </Typography>
                    
                    <Box sx={{ marginBottom: 2 }}>
                        <SearchBar 
                            onSearch={handleSearchButtonClick}
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

                    {noResults && (
                        <Box sx={{ padding: 2, backgroundColor: '#fff', borderRadius: 2, marginTop: 2, boxShadow: 1, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                No results found for the entered city.
                            </Typography>
                        </Box>
                    )}

                    {selectedGems && selectedGems.length > 0 && (
                        <Stack spacing={2} marginTop={3}>
                            {selectedGems.map((gem) => (
                                <Box 
                                    key={gem.id} 
                                    sx={{
                                        padding: 2,
                                        backgroundColor: '#fff',
                                        borderRadius: 2,
                                        boxShadow: 1,
                                    }}
                                >
                                    <Typography variant="h6" color="text.primary" gutterBottom>
                                        {gem.name}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        City: {gem.city}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Country: {gem.country}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Location: {gem.location}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Description: {gem.description}
                                    </Typography>
                                    {gem.picture && (
                                        <img 
                                            src={gem.picture} 
                                            alt={gem.name} 
                                            style={{ maxWidth: '100%', borderRadius: '8px', marginTop: 10 }} 
                                        />
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    )}
            
        
        </Box>
    );
}
