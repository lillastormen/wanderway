export async function fetchCityInfo(cityId) {
    const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityId}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY
        }
    });

    if(!response.ok) {
        throw new Error('Failed to fetch city data');
    }

    return response.json();
   
}
