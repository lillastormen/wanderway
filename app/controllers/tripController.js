import { supabase } from "@/db/dbConnection";

export const Trips = {
    
    create: async (trip) => {
        const { data, error } = await supabase
        .from('Trips')
        .insert( trip );

        if (error) {
            console.error('Error creating trip:', error.message);  // More detailed error message
            return { success: false, error };
        }
    
        return { success: true, data };
    }

}