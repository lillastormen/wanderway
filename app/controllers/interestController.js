import { supabase } from "@/db/dbConnection";

export const Interests = {
    addUserInterests: async (user_id, interests) => {

        //formatting interests as an array of objects
        const interestsData = interests.map(interest => ({
            user_id,
            interest_id: interest,
        }));

        const { data, error } = await supabase
        .from('Users_Interests')
        .insert(interestsData);

        if(error) {
            console.error('Error adding user inerests:', error.message);
            return { success: false, error };
        }
        return { success: true, data}
     }
};