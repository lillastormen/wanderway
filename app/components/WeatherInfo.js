'use client'

import { useState, useEffect } from "react";
import { fetchWeatherInfo } from "../controllers/apiFunctions";

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
        <div>
            <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(1)}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Weather: {weatherData.weather[0].description}</p>
        </div>
    );
};