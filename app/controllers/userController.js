import { supabase } from "@/db/dbConnection";

export const Users = {
    
    create: async (user) => {
        const { data, error } = await supabase
        .from('Users')
        .insert(user)
        .select('id')

        if (error) {
            console.error('Error creating user:', error.message);  // More detailed error message
            return { success: false, error };
        }
    
        return { success: true, data: data[0] };
    }

};