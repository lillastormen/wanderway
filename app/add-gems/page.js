'use client'

import { useState, useEffect } from "react"
import { Gems } from "../controllers/gemController";


export default function addGem() {

    const [formData, setFormData] = useState({
        user_id: '',
        name:'',
        country:'',
        city:'',
        location:'',
        description:'',
        picture: '',
    });

    useEffect(() => {
        // Run this code only on the client side
        if (typeof window !== "undefined") {
            const userId = localStorage.getItem('user_id');
            if (userId) {
                setFormData((prevData) => ({ ...prevData, user_id: userId }));
            }
        }
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const response = await Gems.create(formData);

        if (response.success) {
            console.log('Gem addes successfully!');
            setFormData({
                //resting the form
                user_id: localStorage.getItem('user_id') || '',
                name: '',
                country: '',
                city: '',
                location: '',
                description: '',
                picture: '',
            });
        } else {
            console.error('Failed to add gem:', response.error)
        }
    };

    return (
        <div>
            <h2>Add a gem</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Name</label>
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div>
                    <label>Country</label>
                    <input 
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div>
                    <label>City</label>
                    <input 
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div>
                    <label>Location</label>
                    <input 
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input 
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div>
                    <label>Picture</label>
                    <input 
                        type="text"
                        id="picture"
                        name="picture"
                        value={formData.picture}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <button type="submit">Add</button> 

            </form>
        </div>
    )
}
   