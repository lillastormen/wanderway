'use client'

import { useEffect, useState } from "react";
import { fetchCityInfo } from "../controllers/apiFunctions";

export default function CityInfo({ cityName }) {

    const [cityData, setCityData] = useState(null);
    const[error, setError] = useState(null);

    useEffect(() => {
        const getCityData = async () => {
            if (cityName) {
                try {
                    const data = await fetchCityInfo(cityName);
                    const result = data.parse.text['*'].match(/<p>(.*?)<\/p>/g);
                    console.log(result, data.parse.text);
                    setCityData(result)
                } catch (error) {
                    setError('Error fetching city info')
                    console.error(error)
                }
            }
    };
    
    getCityData();
    }, [cityName]);

    if(!cityData) return <p>Loading city info...</p>

    return (
        <div>
        {cityData ? (
            <div dangerouslySetInnerHTML={{ __html: cityData }} />
        ) : (
            <p>Loading city information...</p>
        )}
    </div>
    );
}



