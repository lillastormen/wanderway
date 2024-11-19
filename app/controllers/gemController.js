import { supabase } from "@/db/dbConnection";

export const Gems = {

    create: async (gem) => {
        const { data, error } = await supabase
        .from('Hidden_Gems')
        .insert( gem )
        .select()

        if (error) {
            console.error('Error creating gem:', error.message)
            return { success: false, error}
        }
        return { success: true, data}
    },

    readAll: async() => {
        const { data, error } = await supabase
        .from('Hidden_Gems')
        .select()

        if (error) {
            console.error('Error reading gems:', error.message)
            return { success: false, error}
        }
        return { success: true, data}

    },

    readCities: async (searchTerm) => {
        const { data, error } = await supabase
        .from('Hidden_Gems')
        .select('id', 'name', 'city', 'country')
        .islike('city', '%${searchTerm}'); // case sensitive search

        if (error) {
            console.error('Error fetching cities:', error.message)
            return { success: false, error}
        }
        return { success: true, data}
    },

    readGemsByCity: async (city) => {
        const { data, error } = await supabase
        .from('Hidden_Gems')
        .select('*')
        .eq('city', city)

        if (error) {
            console.error('Error fetching gems for the city');
            return { success: false, error}
        }
        return { success: true, data}
    }


}