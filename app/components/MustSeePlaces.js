'use client' 

import { useState, useEffect } from "react";
import Image from "next/image";


export default function MustSeePlaces({ cityName }) {

    const [places, setPlaces] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadLocationSearch = async () => {
            setError(null);
            try {
                const response = await fetch(`/api/locationSearch?cityName=${cityName}`);
                console.log("API Response: ", response);
                if (!response.ok) {
                    setError('Failed to fetch locations for the city');
                    return;
                }

                const placesData = await response.json();
                console.log("placesData: ", placesData);

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
        <div>
            <h2>Locations in {cityName}</h2>
            <ul>
                {places.map((place, index) => (
                    
                    <li key={index}>
                        <h3>Name: {place.name}</h3>
                        <p>Address: {place.address_obj?.address_string}</p>   
                        <p>Details: {place.details?.description || 'No description avaiable'}</p> 

                       {/* {place.photos && place.photos.length > 0 ? (
                            <div>Photos: 
                               
                            </div>
                        ) : (
                            <p>No photos avaiable</p>
                        )}  */}

                            {place.details?.web_url && (
                            <a href={place.details.web_url} target="_blank" rel="noopener noreferrer">
                                More about {place.name}
                            </a>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}