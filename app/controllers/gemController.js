import { supabase } from "@/db/dbConnection";

export const Gems = {

    create: async (gem) => {
        const { data, error } = await supabase
        .from('Hidden_Gems')
        .insert( gem )
        .select('*')

        if (error) {
            console.error('Error creating gem:', error.message)
            return { success: false, error}
        }
        return { success: true, data}
    },

    readAll: async() => {
        const { data, error } = await supabase
        .from('Gems')
        .select()

        if (error) {
            console.error('Error reading gems:', error.message)
            return { success: false, error}
        }
        return { success: true, data}

    }
}