import { supabase } from "@/db/dbConnection";

export const Interests = {
    addUserInterests: async (userId, interests) => {

        //formatting interests as an array of objects
        const interestsData = interests.map(interest => ({
            userId,
            interestId: interest,
        }));

        const { data, error } = await supabase
        .from('Users_Interests')
        .insert(interestsData);

        if(error) {
            console.error('Error adding user inerests:', error.message);
            return { success: false, error };
        }
        return { success: true, data}
     },

     readUserInterests: async (userId) => {
        const { data, error } = await supabase
        .from('Users_Interests')
        .select('*')
        .eq('user_id', userId)

        if (error) {
            console.error('Error fetching interests for this user ID:', error.message);
            return { success: false, error };
        }
        return { success: true, data }
     },

     readInterestsByIds: async (interestIds) => {
        const { data, error } = await supabase
        .from ('Interests')
        .select ('interest')
        .in('id', interestIds);

        if (error) {
            console.error('Error fetching interests by Ids');
            return { success: false, error}
        }
        return { success: true, data }
     }
};