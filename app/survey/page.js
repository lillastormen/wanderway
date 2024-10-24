'use client';

import Link from "next/link";
import { useState } from "react";
import { Users } from "../controllers/userController";

export default function Survey() {

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    age_group:'',
    gender:'',
    traveler_type:''
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
    console.log('fsdsfd');

    const response = await Users.create(formData)
      
    console.log(response);


    //const result = await response.json();
    if (response.success) {
      alert('User addes successfully!');
    } else {
      console.error(result.error);
      alert('Failed to add user');
    }
  };


  
  return (
    <>    
    <h2>Surveyyyy</h2>
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
      <div>
        <p>Destination</p>
        DROPDOWN COMES HERE
      </div>
      <div>
        <p>Trip dates</p>
        CALENDAR
      </div>
      <div>
        <p>Budget</p>
        <div>
          <input type="radio" id="explorer" name="budget"/>
          <label htmlFor="explorer">Explorer</label>  
        </div>
        <div>
          <input type="radio" id="comfort" name="budget"/>
          <label htmlFor="comfort">Comfort</label>  
        </div>
        <div>
          <input type="radio" id="indulge" name="budget"/>
          <label htmlFor="indluge">Indulge</label>  
        </div>
      </div>
      <div>
        <p>Interests</p>
        <input type="checkbox" id="vehicle1" name="interest" value="museums"/>
        <label htmlFor="museums">Museums</label>
        <input type="checkbox" id="art-galleries" name="interest" value="art-galleries"/>
        <label htmlFor="art-galleries">Art-galleries</label>
        <input type="checkbox" id="nightlife" name="interest" value="nightlife"/>
        <label htmlFor="nightlife">Nightlife</label>
        <input type="checkbox" id="food" name="interest" value="food"/>
        <label htmlFor="food">Food</label>
        <input type="checkbox" id="hiking" name="interest" value="hiking"/>
        <label htmlFor="hiking">Hiking</label>
        <input type="checkbox" id="beaches" name="interest" value="beaches"/>
        <label htmlFor="beaches">Beaches</label>
        <input type="checkbox" id="shopping" name="interest" value="shopping"/>
        <label htmlFor="shopping">Shopping</label>
        <input type="checkbox" id="music" name="interest" value="music"/>
        <label htmlFor="music">Music</label>
        <input type="checkbox" id="theater" name="interest" value="theater"/>
        <label htmlFor="theater">Theater</label>
        <input type="checkbox" id="architecture" name="interest" value="architecture"/>
        <label htmlFor="architecture">Architecture</label>
        <input type="checkbox" id="photo-ops" name="interest" value="photo-ops"/>
        <label htmlFor="photo-ops">Photo Ops</label>
      </div>
      <div> 
        <p>Peace</p>
        <div>
          <input type="radio" id="relaxed" name="peace"/>
          <label htmlFor="relaxed">Relaxed</label>  
        </div>
        <div>
          <input type="radio" id="adventurer" name="peace"/>
          <label htmlFor="adventurer">Adventurer</label>  
        </div>
        <div>
          <input type="radio" id="thrill-seeker" name="peace"/>
          <label htmlFor="thrill-seeker">Thrill-seeker</label>  
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
