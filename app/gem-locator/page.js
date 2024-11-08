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
        <div className="gem-locator">
            <Card sx={{ maxWidth: 400, margin: 'auto', padding: 0, marginLeft: 2, marginTop: 2, backgroundColor: '#f5f5f5' }}>
                <CardContent>

                    <Typography variant="h6" color="text.primary" gutterBottom>
                        Gem Locator
                    </Typography>
                    
        
                    <Box sx={{ marginBottom: 2, marginTop: 2 }}>
                        <SearchBar 
                            onSearch={handleSearchButtonClick}
                            onAutocompleteChange={handleAutocompleteChange}  />
                    </Box>

                    <Button
                        onClick={handleAddGem}
                        sx={{
                            backgroundColor: 'gray', 
                            color: 'white', 
                            padding: 1,
                            // borderRadius: '%',
                            boxShadow: 1,
                            "&:hover": {
                                backgroundColor: 'darkgray', 
                            },
                            display: 'flex', // Align text and icon horizontally
                           
                            gap: 1, // Space between icon and text
                        }}
                    >
                        <AddIcon />
                        <Typography variant="body2">Add new gem</Typography>
                    </Button>

                    {/* {selectedGems && selectedGems.length > 0 && (
                        <ul className="suggestions-list" style={{ listStyleType: 'none', padding: 0 }}>
                            {selectedGems.map((gem, index) => (
                                <li
                                    key={index}
                                    onClick={() => setSelectedGems([gem])} // Display selected gem details on click
                                    className="suggestion-item"
                                    style={{ padding: '8px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '8px', cursor: 'pointer' }}
                                >
                                    {gem.name}
                                </li>
                            ))}
                        </ul>
                    )} */}

                    {noResults && (
                        <div className="no-results">
                            <p>No results found for the entered city.</p>
                        </div>
                    )}

                    {selectedGems && selectedGems.length > 0 && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 3 }}>
                            {selectedGems.map((gem) => (
                                <Box key={gem.id} sx={{ padding: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
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
                                        <img src={gem.picture} alt={gem.name} className="gem-picture" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    )}
                    
                </CardContent>
            </Card>
        </div>
    );
}
