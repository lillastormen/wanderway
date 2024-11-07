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
                    let split = data.parse.text.split('<meta');
                    split = split[0].split('</table>');
                    let striped = split[1].replace(/<sup[^>]*>[^.]*<\/sup>?/gm, ''); 
                    striped = striped.replace(/<[^>]*>?/gm, '');
                    striped = striped.replace(/\(\/.*\)&#91;n. 1&#93; /gm, '');
                    striped = striped.replace(/&#\d*;/gm, '');

                    setCityData(striped)
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



