import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const cityName = searchParams.get('cityName');

    if (!cityName) {
        console.error("City name is missing.");
        return NextResponse.json({ error: 'City name is required' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_TRIPADVISOR_API_KEY;
    if (!apiKey) {
        console.error("API key is missing.");
        return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
    }

    // Fetch location data
    const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${apiKey}&searchQuery=${cityName}&category=attractions&language=en`;

    console.log(url);

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
            console.error(`Error: Failed to fetch from TripAdvisor API. Status: ${response.status}`);
            return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (!data.data || data.data.length === 0) {
            console.warn("No locations found for the city.");
            return NextResponse.json({ data: [] });
        }
        const limitedData = [data.data[0]];
        // Fetch additional data for each location
        const locationsExtraData = await Promise.all(
            limitedData.map(async (location) => { // data.data.map
                const locationId = location.location_id;

                // Fetch reviews for the location
                // const reviewsUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/reviews?key=${apiKey}&language=en`;
                // const reviewsResponse = await fetch(reviewsUrl, {
                //     method: 'GET',
                //     headers: {
                //         accept: 'application/json',
                //         referer: 'https://wanderway-sigma.vercel.app',
                //         origin: 'https://wanderway-sigma.vercel.app',
                //     }
                // });
                
                // if (!reviewsResponse.ok) {
                //     throw new Error(`Failed to fetch photos for location ID: ${locationId}`);
                // }

                // const reviewsData = await reviewsResponse.json();

                // Fetch details for each location
                // const detailsUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?key=${apiKey}&language=en`;
                const detailsUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?key=${apiKey}&language=en`;
                const detailsResponse = await fetch(detailsUrl, {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        referer: 'https://wanderway-sigma.vercel.app',
                        origin: 'https://wanderway-sigma.vercel.app',
                    }
                });

                if (!detailsResponse.ok) {
                    console.warning(`Error fetching details for location ID: ${locationId}`);
                }

                const detailsData = await detailsResponse.json();
                

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
                
                if (!photosResponse.ok) {
                    console.warning(`Error fetching details for location ID: ${locationId}`);
                }

                const photosData = await photosResponse.json();
                console.log("details", detailsData)
                // Add reviews and photos to the location data
                return {
                    ...location,
                    details: detailsData.description || [],
                    web_url: detailsData.web_url || [],
                    address: detailsData.address_obj?.street1 || [],
                    rating: detailsData.rating || [],
                    photos: photosData.data || []
                };
            }),

          
            
        );
        // Return enriched location data
        console.log({ data: locationsExtraData });

        return NextResponse.json({ data: locationsExtraData });
    } catch (error) {
        console.error("Error in main fetch block:", error);
        return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
    }

    
}
