// import { useState, useEffect } from "react";
// import { fetchLocationSearch } from "../controllers/apiFunctions";

// export default function MustSeePlaces({ cityName }) {

//     const [places, setPlaces] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const loadLocationSearch = async () => {
//             setError(null);
//             try {
//                 const placesData = await fetchLocationSearch(cityName);
//                 if (placesData && placesData.data) {
//                     setPlaces(placesData.data);
//                 } else {
//                     setError('No locations for the this city found')
//                 }
//             } catch (error) {
//                 setError('Failed to load locations for the city')
//             }
//         };

//         loadLocationSearch();
//     }, [cityName]);

//     if (error) return <div style={{ color: "red" }}>{error}</div>;
//     if (!places.length) return <div>Loading locations...</div>;

//     return (
//         <div>
//             <h2>Locations in {cityName}</h2>
//             <ul>
//                 {places.map((place, index) => (
//                     <li key={index}>
//                         <h3>{place.name}</h3>
                    
//                         <p>{place.address}</p>
                        
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
    
// }

import { useState, useEffect } from "react";

export default function MustSeePlaces({ cityName }) {

    const [places, setPlaces] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadLocationSearch = async () => {
            setError(null);
            try {
                const response = await fetch(`/api/locationSearch?cityName=${cityName}`);
                const placesData = await response.json();
                if (placesData && placesData.data) {
                    setPlaces(placesData.data);
                } else {
                    setError('No locations found for this city');
                }
            } catch (error) {
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
                        <h3>{place.name}</h3>
                        <p>{place.address}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
