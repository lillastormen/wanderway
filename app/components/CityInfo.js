'use client'

import { useEffect, useState } from "react";
import { fetchCityInfo } from "../controllers/apiFunctions";

export default function CityInfo({ cityName }) {

    const [cityData, setCityData] = useState(null);
    const[error, setError] = useState(null);

    useEffect(() => {
        const getCityData = async () => {
            try {
                const data = await fetchCityInfo(cityName);
                setCityData(data)
            } catch (error) {
                setError('Error fetching city info')
                console.error(error)
            }
    };
    
    if (cityName) {
        getCityData();
    }
}, [cityName]);

    if(!cityData) return <p>Loading city info...</p>

    return (
        <div>
            <h3>{cityData.name}</h3>
           
            <div>{cityData.description}</div>
        </div>
    );
}