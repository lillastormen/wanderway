'use client'

import { useState, useEffect } from "react"
import { Trips } from "../controllers/tripController";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "/styles/style.css";


export default function TripSurvey() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const urlUserId = searchParams.get('user_id');
    // const [date, setDate] = useState(null);

 

    const [formData, setFormData] = useState({
        user_id: localStorage.getItem('user_id') || urlUserId || '',
        country:'',
        city:'',
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

          // Ensure `user_id` exists
        if (!formData.user_id || formData.user_id === "") {
            console.error("No user ID found. Please create an account first.");
            alert("No user ID found. Please create an account or log in.");
            return;
        }

        const response = await Trips.create(formData);

        console.log("Trip creation response:", response);
        
        if (response.success && response.data && response.data[0]) {
            const tripId = response.data[0].id;
            console.log('Trip created with ID:', tripId);

            //storing generated id in the localstorage
            localStorage.setItem('trip_id', tripId);

            router.push(`/intinerary`)
          } else {
            console.error('Failed to add trip:', response.error);
          }
        };
 




return (
    <>
<h2>Trip info</h2>
<form>
    <div>
        <p>Country</p>
        <input 
          type="text" 
          id="country" 
          name="country" 
          value={formData.country} 
          onChange={handleFormChange}
          />  
    </div>
    <div>
        <p>City</p>
        <input 
          type="text" 
          id="city" 
          name="city" 
          value={formData.city} 
          onChange={handleFormChange}
          />  
    </div>
    <div>
        <p>Start date</p>
        <DatePicker
            selected={formData.start_date}
            onChange={(date) => setFormData((prevData) => ({ ...prevData, start_date: date }))}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select start date"
        />
        <p>End date</p>
        <DatePicker
            selected={formData.end_date}
            onChange={(date) => setFormData((prevData) => ({ ...prevData, end_date: date }))}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select end date"
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