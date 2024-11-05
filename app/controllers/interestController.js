import { supabase } from "@/db/dbConnection";

export const Interests = {
    addUserInterests: async (userId, interests) => {

        //formatting interests as an array of objects
        const interestsData = interests.map(interest => ({
            user_id: userId,
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
     },

     readAll: async () => {
        const { data, error } = await supabase
        .from('Interests')
        .select('*')

        if (error) {
            console.error('Error reading interests:', error.message);
            return { success: false, error }
        } 
        return { success: true, data }
     },

     readUserInterests: async (userId) => {
        const { data, error } = await supabase
        .from('Users_Interests')
        .select('interest_id')
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
        .select ('id, interest')
        .in('id', interestIds);

        if (error) {
            console.error('Error fetching interests by Ids');
            return { success: false, error}
        }
        return { success: true, data }
     },

     updateUserInterest: async (userId, newInterests) => {
        try {
            // Step 1: Fetch current interests
            const { data, error } = await supabase
                .from('Users_Interests')
                .select('interest_id')
                .eq('user_id', userId);

            if (error) {
                console.error('Error fetching current interests:', error.message);
                return { success: false, error };
            }

            // Extract current interest IDs
            const currentInterestIds = data.map(item => item.interest_id);

            // Step 2: Determine interests to add and remove
            const interestsToAdd = newInterests.filter(id => !currentInterestIds.includes(id));
            const interestsToRemove = currentInterestIds.filter(id => !newInterests.includes(id));

            // Step 3: Remove interests that are no longer selected
            if (interestsToRemove.length > 0) {
                const { data, error } = await supabase
                    .from('Users_Interests')
                    .delete()
                    .eq('user_id', userId)
                    .in('interest_id', interestsToRemove);

                if (error) {
                    console.error('Error removing interests:', error.message);
                    return { success: false, error };
                }
            }

            // Step 4: Add new interests that are not already present
            if (interestsToAdd.length > 0) {
                const newInterestRecords = interestsToAdd.map(interestId => ({ 
                    user_id : userId, 
                    interest_id : interestId 
                }));
                const { error } = await supabase
                    .from('Users_Interests')
                    .insert(newInterestRecords);

                if (error) {
                    console.error('Error adding new interests:', error.message);
                    return { success: false, error };
                }
            }

            return { success: true, data };
        } catch (error) {
            console.error('Unexpected error updating interests:', error.message);
            return { success: false, error };
        } 
    } 
     
};