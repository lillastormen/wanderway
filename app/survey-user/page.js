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
  });
 
  //Handle form data change
  const handleFormChange = (e) => {
    setFormData({
    ...formData, //Keep the exsisting data in the FormData state
    [e.target.name]: e.target.value //Update only the field that changed
  });
  };

  //Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
 
    const response = await Users.create(formData)
      
    console.log(response);


    if (response.success) {
      const userId = response.data.id; // Assuming the user ID is returned in the response
      console.log(userId)
      alert('User addes successfully!');
      router.push(`/survey-trip?user_id=${userId}`)
    } else {
      console.error(result.error);
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
            name="age"
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
          value="prefer not to say"
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
