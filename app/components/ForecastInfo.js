import { useEffect, useState } from "react";
import { fetchWeatherForecast } from "../controllers/apiFunctions";
import { Card, CardContent, Typography, Box } from '@mui/material';

export default function ForecastInfo({ cityName }) {
    
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadForecastData = async () => {
            setError(null);
            try {
                const data = await fetchWeatherForecast(cityName);

                console.log(data);

                   // Ensure forecastData is an array
                if (data?.list && Array.isArray(data.list)) {
                    setForecastData(data.list); // Set the forecast data
                } else {
                    setError('Forecast data is missing or malformed');
                }
           
            } catch (error) {
                console.error('Error loading forecast data:', error);
                setError('Failed to load forecast data');
            }
        };

        loadForecastData();
    }, [cityName]);

    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!forecastData) return <div>Loading forecast data...</div>;

    return (
        <Card sx={{ maxWidth: 800, margin: 'auto', padding: 0, marginTop: 2, backgroundColor: '#f5f5f5' }}>
        <CardContent>
            <Typography variant="h6" color="text.primary" gutterBottom>
                8-Days Forecast
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {forecastData.map((forecast, index) => (
                        <Box key={index} sx={{ padding: 2, backgroundColor: '#fff', borderRadius: 1, flex: '1 1 45%' }}>
                            <Typography variant="body1" color="text.primary" gutterBottom>
                                {new Date(forecast.dt * 1000).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Temperature: {(forecast.temp.day - 273.15).toFixed(1)}°C
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Weather: {forecast.weather[0].main}
                            </Typography>
                        </Box>
                    ))}
                </Box>
        </CardContent>
    </Card>
    )
}
