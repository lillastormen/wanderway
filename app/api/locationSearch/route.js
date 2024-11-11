import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const cityName = searchParams.get('cityName');

    if (!cityName) {
        return NextResponse.json({ error: 'City name is required' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_TRIPADVISOR_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
    }

    // Fetch location data
    const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${cityName}&category=attractions&language=en`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                referer: 'https://wanderway-sigma.vercel.app',
                origin: 'https://wanderway-sigma.vercel.app',
            }
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
        }

        const data = await response.json();

        // Fetch additional data for each location
        const enrichedLocations = await Promise.all(
            data.data.map(async (location) => {
                const locationId = location.location_id;

                // Fetch reviews for the location
                const reviewsUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/reviews?key=${apiKey}&language=en`;
                const reviewsResponse = await fetch(reviewsUrl, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        referer: 'https://wanderway-sigma.vercel.app',
                        origin: 'https://wanderway-sigma.vercel.app',
                    }
                });
                const reviewsData = reviewsResponse.ok ? await reviewsResponse.json() : { error: 'Failed to fetch reviews' };

                // Fetch photos for the location
                const photosUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?language=en&key=${apiKey}`;
                const photosResponse = await fetch(photosUrl, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        referer: 'https://wanderway-sigma.vercel.app',
                        origin: 'https://wanderway-sigma.vercel.app',
                    }
                });
                const photosData = photosResponse.ok ? await photosResponse.json() : { error: 'Failed to fetch photos' };

                // Add reviews and photos to the location data
                return {
                    ...location,
                    reviews: reviewsData.data || [],
                    photos: photosData.data || []
                };
            })
        );

        // Return enriched location data
        return NextResponse.json({ data: enrichedLocations });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
    }
}
