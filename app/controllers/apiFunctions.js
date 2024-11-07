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

