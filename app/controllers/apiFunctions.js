export async function fetchCityInfo(cityName) {
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${cityName}&prop=text&formatversion=2&origin=*`;

   const response = await fetch(url, {
        method: 'GET',
   });

    if(!response.ok) {
        throw new Error('Failed to fetch city data');
    }

    return response.json();
   
}



