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
        localStorage.setItem('userId', user_id); //store the new user id

        const interestResponse = await Interests.addUserInterests(user_id, userInterests)
       
        if (!interestResponse.success) {
            console.error('Error adding interests:', interestResponse.error.message);
            return { success: false, error: interestResponse.error };
        }

        return { success: true, data: data[0] };
    },

    readUserById: async (userId) => {
        const { data, error} = await supabase
        .from('Users')
        .select('*')
        .eq('id', userId)
        .single()

        if (error) {
            console.error(`Error fetching user with ID ${userId}:`, error.message);
            return { success: false, error};
        }

        return { success: true, data}
    },

    loginUser: async (email, password) => {
        const { data, error} = await supabase
        .from('Users')
        .select('id')
        .eq('email', email)
        .eq('password', password)
        .single()

        if (error) {
            console.error(`Error fetching user with email ${email}:`, error.message);
            return { success: false, error};
        }

        console.log('User data fetched:', data);
        return { success: true, data}
    },

    update: async (userId, updatedData) => {
        const { data, error } = await supabase
        .from('Users')
        .update(updatedData)
        .eq('id', userId)

        if (error) {
            console.error(`Error updating user with ID ${userId}`);
            return { success: false, error }
        }

        return { success: true, data}
    },

    remove: async (userId) => {
        const { data, error } = await supabase
        .from('Users')
        .delete()
        .eq('id', userId)

        if (error) {
            console.error(`Error deleting user with ID ${userId}`);
            return { success: false, error}
        }

        return { success: true, data}
    }

};