'use client' 

import { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, CardMedia, Link } from '@mui/material';

export default function MustSeePlaces({ cityName }) {

    const [places, setPlaces] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadLocationSearch = async () => {
            setError(null);
            try {
                const response = await fetch(`/api/locationSearch?cityName=${cityName}`);
              
                if (!response.ok) {
                    setError('Failed to fetch locations for the city');
                    return;
                }

                const placesData = await response.json();
               

                if (placesData && placesData.data) {
                    setPlaces(placesData.data);
                } else {
                    setError('No locations found for this city');
                }
            } catch (er) {
                console.error("Error during fetch:", er);
                setError('Failed to load locations for the city');
            }
        };

        if (cityName) {
            loadLocationSearch();
        }
    }, [cityName]);

   
    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (!places.length) return <div>Loading locations...</div>;

    return (
            <Box>
                {places.map((place, index) => (
                    <Card key={index} sx={{ marginBottom: 3 }}>
                        <CardContent sx={{display: "flex", flexDirection: "column", gap: 1, }}>
                            
                            <Box>
                                <Typography variant="h6" component="h3" marginBottom={0}>
                                    {place.name}
                                </Typography>
                            </Box>

                            <Box>
                                {/* Address */}
                                <Typography variant="body2" color="textSecondary" marginTop={0}>
                                   {place.address|| 'No address available'}
                                </Typography>
                            </Box>

                            <Box>
                                {/* description */}
                                <Typography variant="body1" color="textSecondary">
                                    {place.details || 'No description available'}
                                </Typography>
                            </Box>

                            <Box>
                                {/* picture */}
                                {place.photos && place.photos.length > 0 ? (
                                    <CardMedia
                                        component="img"
                                        image={place.photos[0]?.images?.medium?.url || ''}
                                        alt={`${place.name} image`}
                                        sx={{ objectFit: 'cover' }}
                                    />
                                ) : (
                                    <Typography variant="body2" color="textSecondary">No photos available</Typography>
                                )}
                            </Box>

                            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                <Box>
                                    {/* rating */}
                                    <Typography variant="body1" color="textSecondary">
                                        Rating: {place.rating || 'No rating available'}
                                    </Typography>
                                </Box>
                                <Box>
                                    {place.web_url && (
                                        <Typography variant="body1" color="textSecondary" marginBottom={0}>
                                            <Link href={place.web_url}>
                                                Read More
                                            </Link>
                                        </Typography>
                                    )}
                                 </Box>
                            </Box>
                           
                        </CardContent>
                    </Card>
                ))}
            </Box>
    );
}