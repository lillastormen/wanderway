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

    // return NextResponse.json({"message":{"role":"assistant","content":"Based on Alinka's interests in museums, art galleries, food, beaches, shopping, and architecture, here is a suggested itinerary for her trip to Barcelona, Spain:\n\nDay 1:\n- Morning: Visit the Picasso Museum to explore the works of the famous artist.\n- Afternoon: Enjoy a delicious Spanish lunch at a local tapas bar.\n- Evening: Take a relaxing stroll along Barceloneta Beach and watch the sunset.\n\nDay 2:\n- Morning: Visit the Sagrada Familia to marvel at Gaudi's masterpiece of architecture.\n- Afternoon: Explore the Gothic Quarter, where you can find charming shops and boutiques for some shopping.\n- Evening: Have dinner at a traditional Catalan restaurant for a taste of authentic local cuisine.\n\nDay 3:\n- Morning: Visit Park Guell to admire more of Gaudi's unique architectural creations.\n- Afternoon: Head to El Born district to visit contemporary art galleries and trendy fashion stores.\n- Evening: Relax with some seafood paella at a beachfront restaurant.\n\nDay 4:\n- Morning: Take a day trip to Montserrat to see the stunning mountain views and visit the monastery.\n- Afternoon: Enjoy a leisurely lunch at a local restaurant in Montserrat.\n- Evening: Return to Barcelona and unwind with some evening shopping along Passeig de Gracia.\n\nDay 5:\n- Morning: Visit the Barcelona Contemporary Art Museum for a dose of modern art.\n- Afternoon: Explore the bustling La Boqueria Market for delicious local food and souvenirs.\n- Evening: Take a leisurely walk along the La Rambla street for street performances and more shopping opportunities.\n\nDay 6:\n- Morning: Visit the National Art Museum of Catalonia to see a vast collection of Catalan art.\n- Afternoon: Take a relaxing boat tour along the coast for a different perspective of Barcelona's architecture.\n- Evening: Enjoy a farewell dinner at a rooftop restaurant overlooking the city skyline.\n\nThis itinerary combines Alinka's interests with the sights and activities Barcelona has to offer. Have a wonderful trip!","refusal":null}});

}
