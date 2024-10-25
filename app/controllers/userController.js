import { supabase } from "@/db/dbConnection";
import { Interests } from "./interestController";


export const Users = {
    
    create: async (user, userInterests = []) => {

        const { interests, ...userData} = user;

        const { data, error } = await supabase
        .from('Users')
        .insert(userData)
        .select('id')

        if (error) {
            console.error('Error creating user:', error.message);  // More detailed error message
            return { success: false, error };
        }

        const user_id = data[0].id;

        const interestResponse = await Interests.addUserInterests(user_id, userInterests)
       
        if (!interestResponse.success) {
            console.error('Error adding interests:', interestResponse.error.message);
            return { success: false, error: interestResponse.error };
        }

        return { success: true, data: data[0] };
    }

};