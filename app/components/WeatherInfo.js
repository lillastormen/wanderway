'use client'

import { useState, useEffect } from "react";
import { fetchWeatherInfo } from "../controllers/apiFunctions";
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';


export default function WeatherInfo({ cityName }) {

    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        const loadWeatherData = async () => {
            setError(null);
            try {
                const data = await fetchWeatherInfo(cityName);
                setWeatherData(data);
           
            } catch (error) {
                console.error('Error loading weather data:', error);
                setError('Failed to load weather data');
            }
        };

        loadWeatherData();

    }, [cityName]);

    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!weatherData) return <div>Loading weather data...</div>;

    return (
        <Card sx={{ margin: 'auto', padding: 0, backgroundColor: '#f5f5f5' }}>
            <CardContent>
                <Typography variant="h6" color="text.primary" gutterBottom>
                    Today
                </Typography>
                <Box sx={{ padding: 2, backgroundColor: '#fff', borderRadius: 1}}>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Temperature: {(weatherData.main.temp - 273.15).toFixed(1)}°C
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Feels like: {(weatherData.main.feels_like - 273.15).toFixed(1)}°C
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Humidity: {weatherData.main.humidity}%
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Pressure: {weatherData.main.pressure} hPa
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Weather: {weatherData.weather[0].description}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Clouds: {weatherData.clouds.all}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Wind: {(weatherData.wind.speed * 3.6).toFixed(2)} km/h
                    </Typography>
                </Box>
        </CardContent>
    </Card>
    );
};