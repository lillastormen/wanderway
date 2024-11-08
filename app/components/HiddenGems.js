import { useState, useEffect } from "react";
import { Gems } from "../controllers/gemController";
import { Card, CardContent, Typography, Box } from "@mui/material";

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

    if (!hiddenGems.length) {
        return <Typography>No hidden gems found in this city.</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 400, display: 'flex', flexWrap: 'wrap', gap: 1, marginTop: 2 }}>
        {hiddenGems.map((gem) => (
            <Card key={gem.id} sx={{ maxWidth: 300, backgroundColor: '#f5f5f5', boxShadow: 1 }}>
                <CardContent>
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        {gem.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                        {gem.picture}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {gem.description}
                    </Typography>
                </CardContent>
            </Card>
        ))}
    </Box>
    )
}
