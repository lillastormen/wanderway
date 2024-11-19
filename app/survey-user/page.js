'use client';

import { useState } from "react";
import { Users } from "../controllers/userController";
import { useRouter } from "next/navigation";
import UserSurveyForm from "../components/UserSurveyForm";

export default function UserSurvey() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age_group: '',
    gender: '',
    traveler_type: '',
    interests: [],
  });
  
  // Define the interest mapping (this could be fetched from the database)
  const interestMapping = {
    Museums: 1,
    "Art-galleries": 2,
    Nightlife: 3,
    Food: 4,
    Hiking: 5,
    Beaches: 6,
    Shopping: 7,
    Music: 8,
    Theater: 9,
    Architecture: 10,
    "Photo Ops": 11
  };

  // Handle form data change
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "interest") {
      setFormData((prevData) => ({
        ...prevData,
        interests: checked
          ? [...prevData.interests, value]  // Add the ID instead of the string
          : prevData.interests.filter((interest) => interest !== value)
      }));
    } else {
      setFormData({
        ...formData, // Keep the existing data in the FormData state
        [name]: value // Update only the field that changed
      });
    }
  };

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userData = { ...formData };
    const userInterests = formData.interests; // Interests will be passed as IDs now
    
    const response = await Users.create(userData, userInterests);

    if (response.success) {
      const userId = response.data.id; // Assuming the user ID is returned in the response
      alert('User added successfully!');
      router.push(`/survey-trip?user_id=${userId}`);
    } else {
      console.error(response.error);
      alert('Failed to add user');
    }
  };

  return (
      <UserSurveyForm 
        formData={formData} 
        handleFormChange={handleFormChange} 
        handleFormSubmit={handleFormSubmit} 
      />
  );
}

