'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { Trips } from "../controllers/tripController";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";


export default function TripSurvey() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const urlUserId = searchParams.get('user_id');
 

    const [formData, setFormData] = useState({
        user_id: localStorage.getItem('user_id') || urlUserId || '',
        destination:'',
        start_date:'',
        end_date:'',
        budget:'',
        peace:'',
    });

    // If user_id is available from the URL, store it in localStorage (this can be done inside state initialization)
    if (urlUserId && !localStorage.getItem('user_id')) {
        localStorage.setItem('user_id', urlUserId); // Store user_id in localStorage
    }

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


        
        if (response.success) {
            alert('Trip added successfully!');
            router.push(`/intinerary`)
          } else {
            console.error(response.error);
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