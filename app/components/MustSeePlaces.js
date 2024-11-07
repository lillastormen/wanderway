import { useState, useEffect } from "react";
import { fetchMustSeePlaces } from "../controllers/apiFunctions";

export default function MustSeePlaces({ cityName }) {

    const [places, setPlaces] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMustSeePlaces = async () => {
            setError(null);
            try {
                const placesData = await fetchMustSeePlaces(cityName);
                if (placesData) {
                    setPlaces(placesData);
                } else {
                    setError('No places found')
                }
            } catch (error) {
                setError('Failed to load must-see places')
            }
        };

        loadMustSeePlaces();
    }, [cityName]);

    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (!places.length) return <div>Loading places...</div>;

    
}