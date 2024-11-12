import { supabase } from "@/db/dbConnection";
import OpenAI from "openai";

export const Trips = {
    
    create: async (trip) => {
        const { data, error } = await supabase
        .from('Trips')
        .insert( trip )
        .select('*')
        .single()

        if (error) {
            console.error('Error creating trip:', error.message);  // More detailed error message
            return { success: false, error };
        }

        // Call AI API to create itinerary
        try {
            const aiResponse = await fetch(`/api/openAI?tripId=${data.id}&userId=${data.user_id}`);
            const aiData = await aiResponse.json();

            console.log(aiData.itinerary);
            if (aiData.itinerary) {
                const updatedData = { ...data, itinerary: aiData.itinerary };
               
                const { update, error } = await supabase
                .from('Trips')
                .update(updatedData)
                .eq('id', updatedData.id)
                .select('*')

                
            }
        } catch (error) {
            console.log(error);
        }

        return { success: true, data };
    },

    readAll: async () => {
        const { data, error } = await supabase
        .from('Trips')
        .select();

        if (error) {
            console.error('Error fetching trips', error.message);
            return { success: false, error}
        }

        return { success: true, data };
    },

    readById: async (tripId) => {
        const { data, error } = await supabase
        .from('Trips')
        .select()
        .eq('id', tripId)
        .single()

        console.log(tripId);

        if (error) {
            console.error('Error fetching a trip', error.message);
            return { success: false, error}
        }

        return { success: true, data }
    },

    readTripByUserId: async (userId) => {
        // console.log('Fetching trips for user ID:', userId)
        const { data, error } = await supabase
        .from('Trips')
        .select()
        .eq('user_id', userId)

        if (error) {    
            console.error(`Error fetching trips by user ID ${userId}:`, error.message)
            return { success: false, error }
        }

        return { success: true, data }
    },

    update: async (tripId, updatedData) => {
        const { data, error } = await supabase
        .from('Trips')
        .update(updatedData)
        .eq('id', tripId)
        .select('*')

        console.log('in update')
        if (error) {
            console.error(`Error updating a trip with ID ${tripId}`, error.message)
            return { success: false, error }
        }

        return { success: true, data }
    },

    remove: async (tripId) => {
        const { data, error } = await supabase
        .from('Trips')
        .delete()
        .eq('id', tripId);

        if (error) {
            console.error(`Error deleting a trip with ID ${tripId}`, error.message)
            return { success: false, error }
        }

        return { success: true, data }
    }

}