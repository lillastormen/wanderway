import { supabase } from "@/db/dbConnection";

export const Trips = {
    
    create: async (trip) => {
        const { data, error } = await supabase
        .from('Trips')
        .insert( trip )
        .select('*')

        if (error) {
            console.error('Error creating trip:', error.message);  // More detailed error message
            return { success: false, error };
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
        .select('destination, start_date, end_date, id')
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