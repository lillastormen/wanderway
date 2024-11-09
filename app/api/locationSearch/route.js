import { NextResponse, searchParams } from "next/server";


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const cityName = searchParams.get('cityName'); // Extract the city name from the query string

    if (!cityName) {
        return NextResponse.json({ error: 'City name is required' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_TRIPADVISOR_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
    }

    const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${cityName}&language=en`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                referer: 'https://wanderway-sigma.vercel.app',  // Ensure the referer matches your app
                origin: 'https://wanderway-sigma.vercel.app',
            }
        });

        console.log(response); 
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
    }
}

