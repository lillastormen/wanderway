import OpenAI from "openai";
import { Users } from "@/app/controllers/userController";
import { Interests } from "@/app/controllers/interestController";
import { Trips } from "@/app/controllers/tripController";
import { NextResponse, searchParams } from "next/server";


export async function GET(req) {

    const { searchParams } = new URL(req.url);
    const tripId = searchParams.get('tripId'); // Extract ids from the query 
    const userId = searchParams.get('userId');

    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    const projectId = process.env.NEXT_PUBLIC_AI_PROJECT_KEY;

    const openai = new OpenAI({
        projectId: projectId,
        apiKey: apiKey
    });

    // Fetch all the information we need 
    const fetchUserInfo = async (userId) => {
        try {
            const response = await Users.readUserById(userId);
            return response;
        } catch (error) {
            console.error('Error fetching user info:', error);
            return ;
        }
    };

    const fetchTripInfo = async (tripId) => {
        try {
            const response = await Trips.readById(tripId);
            return response;
        } catch (error) {
            console.error('Error fetching trip info:', error);
            return null;
        }
    };

    const fetchUserInterests = async (userId) => {
        try {
            //Get the interest IDs from Users_Interests table
            const { success, data, error } = await Interests.readUserInterests(userId);
            if (!success || error) {
                console.error('Error fetching interest IDs:', error.message);
                return [];
            }
    
            // Extract interest IDs from the response
            const interestIds = data.map(entry => entry.interest_id);
    
            // Fetch the interest names/details by IDs from Interests table
            const { success: interestSuccess, data: interestData, error: interestError } = await Interests.readInterestsByIds(interestIds);
            if (!interestSuccess || interestError) {
                console.error('Error fetching interests by IDs:', interestError.message);
                return [];
            }
    
            return interestData; // This should be an array of interest objects
        } catch (error) {
            console.error('Error fetching user interests:', error);
            return [];
        }
    };

    //Fetch data we need for a prompt
    const userInfo = await fetchUserInfo(userId);
    const tripInfo = await fetchTripInfo(tripId);
    const interests = await fetchUserInterests(userId);

    // If tripInfo is an array, use it directly. If it's a single object, wrap it in an array.
    const trips = Array.isArray(tripInfo) ? tripInfo : tripInfo ? [tripInfo] : [];

    console.log("User Info:", userInfo);
    console.log("Trip Info:", tripInfo);
    console.log("User Interests:", interests);

    const tripDetails =`${tripInfo.data.city}, ${tripInfo.data.country} for period ${tripInfo.data.start_date} - ${tripInfo.data.end_date} at ${tripInfo.data.peace} peace (where relaxed is easy peace, thrill-seeker looks for adrenaline and adventurer is somewhere in between these two) and a ${tripInfo.data.budget} level budget (where explorer is the economic one, comfort the normal one and indulge almost a luxury)`;
    const interestsList = interests.map(interest => interest.interest).join(", ");

    const messageContent = `
        You are a travel planner creating an intinerary for ${userInfo.data.name}'s trip. They are of age ${userInfo.data.age_group}, gender ${userInfo.data.gender} and they are traveling with ${userInfo.data.traveler_type}. The user has planned the following trip: ${tripDetails}. This user is interested in: ${interestsList}. Please make in in markdown, as a list structured by day, with each day's activities under keys for Day 1, Day 2, etc. and times of the day: morning, afternoon evening. Adjust itinerary to all these preferences. Be specific - suggest actual places and be factual, for example 'National Art Museum of Catalonia - collection of catalan art'. Estimate expanses per day. Use the headline: Itinerary: 
    `;

    // Create openAI chat completion
    const completions = await openai.chat.completions.create({
        messages: [{ role: "system", content: messageContent}],
        model: "gpt-3.5-turbo", //gtp-4o
    });
    
    const itineraryResponse = completions.choices[0].message.content;
    const itinerary = itineraryResponse;
    return NextResponse.json({ itinerary });



}
