import { Users } from "./userController";

// export default async function handler(req, res) {
//     if(req.method === 'POST') {
//         try {
//             const { name, email, age_group, gender, traveler_type } = req.body;

//             const result = await Users(name, email, age_group, gender, traveler_type);

//             if(result.error) {
//                 return res.status(500).json({ error: result.error.message})
//             }
        
//             return res.status(200).json({ message: 'User added successfully!', data: result});
//         }   catch(error) {
//             return res.status(500).json({ error: 'Failed to add user' });
//         }
//     }
// }
    
