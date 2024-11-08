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

export async function fetchWeatherInfo(cityName) {

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    const response = await fetch (url, {
        method: 'GET',
    });

    if(!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    return response.json();
}

export async function fetchWeatherForecast(cityName) {

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&cnt=8&appid=${apiKey}`;

    const response = await fetch (url, {
        method: 'GET',
    })

    if(!response.ok) {
        throw new Error('Failed to fetch forecast');
    }

    return response.json();
}

// export async function fetchMustSeePlaces(cityName) {

//     const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
//     const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=must+see+places+in+${cityName}&key=${apiKey}`;

//     const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//         },
//         mode: 'cors'
//     })

//     console.log(response);
//     if(!response.ok) {
//         throw new Error('Failed to fetch must-see places');
//     }

//     return response.json();
// }

export async function fetchLocationSearch (cityName) {

    const apiKey = process.env.NEXT_PUBLIC_TRIPADVISOR_API_KEY;
    const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${cityName}&language=en`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                referer: 'wanderway-sigma.vercel.app/'
            },
       
        
    })

    console.log(response);
    if(!response.ok) {
        throw new Error('Failed to fetch locations');
    }

    return response.json();
}

// export async function fetchLocationSearch (cityName) {

//     const response = await fetch(`api/locationSearch?cityName=${cityName}`);
   
//  if(!response.ok) {
//         throw new Error('Failed to fetch locations');
//     }

//     return response.json();
// }
