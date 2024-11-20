import { useState, useEffect } from "react";
import { Gems } from "../controllers/gemController";
import { Stack, Typography, Box, Card, CardContent } from "@mui/material";

export default function HiddenGems ({ cityName }) {

    const [hiddenGems, setHiddenGems] = useState([]);
    const[loadingGems, setLoadingGems] = useState(false);
    
    useEffect(() => {
        const fetchHiddenGems = async () => {
            console.log('Searching for gems:', cityName)
            setLoadingGems(true);
            try {
                const response = await Gems.readGemsByCity(cityName);
                if (response.success) {
                    setHiddenGems(response.data);
                } else {
                    console.error('Failed to fetch hidden gems:', response.error)
                }
            } catch {
                console.error('Error fetching hidden gems:', response.error)
            } finally {
                setLoadingGems(false);
            }
        };

        if (cityName) {
            fetchHiddenGems();
        }
    }, [cityName]);

    if (loadingGems) {
        return <Typography>Loading hidden gems...</Typography>;
    }

    return (
        <>
            {hiddenGems.length < 1 ? (
                <Box
                    sx={{
                        padding: 2,
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        marginTop: 2,
                        boxShadow: 1,
                        textAlign: "center",
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        No results found for the entered city.
                    </Typography>
                </Box>
            ) : (
                <Stack spacing={2} sx={{ marginTop: 2 }}>
                    {hiddenGems.map((gem) => (
                        <Card
                            sx={{
                                padding: 1,
                                paddingBottom: 0,
                                backgroundColor: "#f5f5f5",
                                boxShadow: 1,
                            }}
                            key={gem.id}
                        >
                            <CardContent sx={{ padding: "0 8px 0 8px" }}>
                                <Typography variant="h6" color="text.primary" gutterBottom>
                                    {gem.name}
                                </Typography>
                                <Box
                                    sx={{
                                        padding: 2,
                                        backgroundColor: "#fff",
                                        borderRadius: 2,
                                    }}
                                >
                                    <Typography variant="body1" color="text.secondary">
                                        <strong>City: </strong>
                                        {gem.city}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        <strong>Country: </strong>
                                        {gem.country}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        <strong>Precise location: </strong>
                                        {gem.location}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        <strong>Description: </strong>
                                        {gem.description}
                                    </Typography>
                                    {gem.picture && (
                                        <img
                                            src={gem.picture}
                                            alt={gem.name}
                                            style={{
                                                maxWidth: "100%",
                                                borderRadius: "8px",
                                                marginTop: 10,
                                            }}
                                        />
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            )}
        </>
    );
}
