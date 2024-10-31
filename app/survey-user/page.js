'use client';

import Link from "next/link";
import { useState } from "react";
import { Users } from "../controllers/userController";
import { useRouter } from "next/navigation";

export default function UserSurvey() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    age_group:'',
    gender:'',
    traveler_type:'',
    interests: [],
  });
 
  //Handle form data change
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "interest") {
      setFormData((prevData) => ({
        ...prevData,
        interests: checked
          ? [...prevData.interests, value]
          : prevData.interests.filter((interest) => interest !== value)
      }));
    } else {

    setFormData({
    ...formData, //Keep the exsisting data in the FormData state
    [name]: value //Update only the field that changed
    });
  } 
};

  //Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userData = { ...formData };
    const userInterests = formData.interests;
 
    const response = await Users.create(userData, userInterests)
      
    console.log(response);


    if (response.success) {
      const userId = response.data.id; // Assuming the user ID is returned in the response
      console.log(userId)
      alert('User addes successfully!');
      router.push(`/survey-trip?user_id=${userId}`)
    } else {
      console.error(response.error);
      alert('Failed to add user');
    }
  };


  
  return (
    <>    
    <h2>User info</h2>
    <form>
      <div>
        <p>Name</p>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleFormChange}
          />  
      </div>
      <div>
        <p>Email</p>
        <input 
          type="text" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleFormChange}
          />  
      </div>
      <div>
        <p>Age</p>
        <div>
          <input 
            type="radio" 
            id="age1" 
            name="age_group"
            value="-25"
            onChange={handleFormChange}
          />  
          <label htmlFor="age1">-25</label>
        </div>
        <div>
          <input 
            type="radio" 
            id="age2" 
            name="age_group"
            value="25-31"
            onChange={handleFormChange}
          /> 
          <label htmlFor="age2">25-31</label> 
        </div>
        <div>
          <input 
            type="radio" 
            id="age3" 
            name="age_group"
            value="32-38"
            onChange={handleFormChange}
          />  
          <label htmlFor="age3">32-38</label> 
        </div>
        <div>
          <input 
            type="radio" 
            id="age4" 
            name="age_group"
            value="39-45"
            onChange={handleFormChange}
          />
          <label htmlFor="age4">39-45</label>  
        </div>
        <div>
          <input 
            type="radio" 
            id="age5" 
            name="age_group"
            value="45+"
            onChange={handleFormChange}
          />  
          <label htmlFor="age5">45+</label> 
        </div>
      </div>
      <div>
        <p>Identity</p>
        <div>
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          onChange={handleFormChange}
        /> 
          <label htmlFor="female">Female</label> 
        </div>
        <div>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          onChange={handleFormChange}
        />  
          <label htmlFor="male">Male</label> 
        </div>
        <div>
        <input
          type="radio"
          id="non-binary"
          name="gender"
          value="non-binary"
          onChange={handleFormChange}
        /> 
          <label htmlFor="non-binary">Non-binary</label> 
        </div>
        <div>
        <input
          type="radio"
          id="secret"
          name="gender"
          value="prefer-not-to-say"
          onChange={handleFormChange}
        />  
          <label htmlFor="secret">Prefer not to say</label> 
        </div>
      </div>
      <div>
        <p>Traveller type</p>
        <div>
        <input
          type="radio"
          id="solo"
          name="traveler_type"
          value="solo"
          onChange={handleFormChange}
        />  
          <label htmlFor="solo">Solo</label> 
        </div>
        <div>
        <input
          type="radio"
          id="friends"
          name="traveler_type"
          value="friends"
          onChange={handleFormChange}
        />
          <label htmlFor="friends">Friends</label>  
        </div>
        <div>
        <input
          type="radio"
          id="family"
          name="traveler_type"
          value="family"
          onChange={handleFormChange}
        />
          <label htmlFor="family">Family</label> 
        </div>
      </div>
      <div>
        <p>Interests</p>
        <div>
          <input 
            type="checkbox" 
            id="museums" 
            name="interest" 
            value="1"
            onChange={handleFormChange}
          />
          <label htmlFor="museums">Museums</label>
          <input 
            type="checkbox" 
            id="art-galleries" 
            name="interest" 
            value="2"
            onChange={handleFormChange}
          />
          <label htmlFor="art-galleries">Art-galleries</label>
          <input 
            type="checkbox" 
            id="nightlife" 
            name="interest" 
            value="3"
            onChange={handleFormChange}
          />
          <label htmlFor="nightlife">Nightlife</label>
          <input 
            type="checkbox" 
            id="food" 
            name="interest" 
            value="4"
            onChange={handleFormChange}
          />
          <label htmlFor="food">Food</label>
          <input 
            type="checkbox" 
            id="hiking" 
            name="interest" 
            value="5"
            onChange={handleFormChange}
          />
          <label htmlFor="hiking">Hiking</label>
          <input 
            type="checkbox" 
            id="beaches" 
            name="interest" 
            value="6"
            onChange={handleFormChange}
          />
          <label htmlFor="beaches">Beaches</label>
          <input 
            type="checkbox" 
            id="shopping" 
            name="interest" 
            value="7"
            onChange={handleFormChange}
          />
          <label htmlFor="shopping">Shopping</label>
          <input 
            type="checkbox" 
            id="music" 
            name="interest" 
            value="8"
            onChange={handleFormChange}
          />
          <label htmlFor="music">Music</label>
          <input 
            type="checkbox" 
            id="theater" 
            name="interest" 
            value="9"
            onChange={handleFormChange}
          />
          <label htmlFor="theater">Theater</label>
          <input 
            type="checkbox" 
            id="architecture" 
            name="interest" 
            value="10"
            onChange={handleFormChange}
          />
          <label htmlFor="architecture">Architecture</label>
          <input 
            type="checkbox" 
            id="photo-ops" 
            name="interest" 
            value="11"
            onChange={handleFormChange}
          />
          <label htmlFor="photo-ops">Photo Ops</label>
        </div>
      </div> 
     
      
        <button 
          className="border-solid border-"
          onClick={handleFormSubmit}
        >
          <p>Ready!</p>
        </button>
      
   
    </form>
   

    </>

  );
}
