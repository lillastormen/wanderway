import { supabase } from "@/db/dbConnection";

export const Users = {
    
    create: async (user) => {
        const { data, error } = await supabase
        .from('Users')
        .insert( user );

        if (error) {
            console.error('Error creating product:', error.message);  // More detailed error message
            return { success: false, error };
        }
    
        return { success: true, data };
    }

}