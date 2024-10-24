'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { Trips } from "../controllers/tripController";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


export default function TripSurvey() {

    const searchParams = useSearchParams()
    const user_id = searchParams.get('user_id')
 

    const [formData, setFormData] = useState({
        user_id: user_id || '',
        destination:'',
        start_date:'',
        end_date:'',
        budget:'',
        peace:'',
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
        // if (!formData.user_id) {
        //     alert('Error: user_id is missing');
        //     return;
        // }

        const response = await Trips.create(formData)
        
        console.log(response);


        //const result = await response.json();
        if (response.success) {
        alert('Trip addes successfully!');
        } else {
        console.error(result.error);
        alert('Failed to add trip');
        }
    };




return (
    <>
<h2>Trip info</h2>
<form>
    <div>
        <p>Destination</p>
        <input 
          type="text" 
          id="destination" 
          name="destination" 
          value={formData.destination} 
          onChange={handleFormChange}
          />  
    </div>
    <div>
        <p>Start date</p>
        <input 
          type="text" 
          id="start_date" 
          name="start_date" 
          value={formData.start_date} 
          onChange={handleFormChange}
          /> 
        <p>End date</p>
        <input 
          type="text" 
          id="end_date" 
          name="end_date" 
          value={formData.end_date} 
          onChange={handleFormChange}
          /> 
    </div>
    <div>
        <p>Budget</p>
        <div>
            <input
                type="radio"
                id="explorer"
                name="budget"
                value="explorer"
                onChange={handleFormChange}  // Added the handler
            />
            <label htmlFor="explorer">Explorer</label>
        </div>
        <div>
            <input
                type="radio"
                id="comfort"
                name="budget"
                value="comfort"
                onChange={handleFormChange}  // Added the handler
            />
            <label htmlFor="comfort">Comfort</label>
        </div>
        <div>
            <input
                type="radio"
                id="indulge"
                name="budget"
                value="indulge"
                onChange={handleFormChange}  // Added the handler
            />
            <label htmlFor="indulge">Indulge</label>
        </div>  
        
    </div>
    {/* <div>
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
    </div> */}
    <div> 
        <p>Peace</p>
        <div>
            <input
                type="radio"
                id="relaxed"
                name="peace"
                value="relaxed"
                onChange={handleFormChange}  
            />
            <label htmlFor="relaxed">Relaxed</label>  
        </div>
        <div>
            <input
                type="radio"
                id="adventurer"
                name="peace"
                value="adventurer"
                onChange={handleFormChange}  
            />
            <label htmlFor="adventurer">Adventurer</label>
        </div>
        <div>
            <input
                type="radio"
                id="thrill-seeker"
                name="peace"
                value="thrill-seeker"
                onChange={handleFormChange}  
            />
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
)
}