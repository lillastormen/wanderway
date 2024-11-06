'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { Trips } from "../controllers/tripController";
import { useRouter } from "next/navigation";

export default function Trip() {

    // const router = useRouter();
    const [activeTab, setActiveTab] = useState("Intinerary");
    // const [trip, setTrip] = useState({ destination: "Loading...", start_date: "Loading...", end_date: "Loading..."});
    const [activeTrips, setActiveTrips] = useState([]);
    // const [tripEdit, setTripEdit] = useState(false);
    const [editingTripId, setEditingTripId] = useState(null);
    

    const switchTab = () => {
        switch (activeTab) {
            case "Intinerary": 
                return <div>Itinerary details go here</div>;
            case "Good to know":
                return <div>Important travel tips and information</div>
            case "Must see":
                return <div>Must-see attractions and landmarks</div>
            case "Explore":
                return <div>Discover more</div>
            case "Hidden gems":
                return <div>Hidden gems in your area</div>
            default:
                return null;
        }
    };

    //fetch the current trip
    useEffect(() => { 
        const fetchActiveTrips = async () => {
            const userId = localStorage.getItem('user_id');

            const response = await Trips.readTripByUserId(userId);
            if (response.success) {
                // const fetchedTrip = response.data;
                const today = new Date();
                const activeTrips = response.data.filter(trip => new Date(trip.end_date) >= today)
                console.log(activeTrips);
                setActiveTrips(activeTrips);
                // const tripEndDate = new Date(fetchedTrip.end_date);
                 
                // if(tripEndDate < today) {
                //     console.log('No current trips')
                //     setTrip(null);
                // } else {
                //     setTrip(fetchedTrip);
                // }
            } else {
                console.log('Failes to fetch trip:', response.error)
            }    
        };

        fetchActiveTrips();
    }, []);

    const handleFormChange = (e, tripId) => {
        const { name, value } = e.target;
        setActiveTrips((prevTrips) =>
            prevTrips.mpa((trip) =>
                trip.id === tripId ? { ...trip, [name]: value } : trip
            )
        );
    };

    const handleSave = async (e, tripId) => {
        e.preventDefault();
        const tripToUpdate = activeTrips.find((trip) => trip.id === tripId);
        const response = await Trips.update(tripId, tripToUpdate);

        if (response.success) {
            console.log('Trip updated successfully!')
            setEditingTripId(false);
        } else {
            console.error('Failed to update the trip:', response.error)
        }
    };

    // //handle adding a new trip
    // const handleAddNewTrip = async (newTripData) => {
    //     const response = await Trips.create(newTripData);
    //     if (response.success && response.data && response.data[0]) {
    //         const newTrip = response.data[0];
    //         setActiveTrips((prevTrips) => [...prevTrips, newTrip]);
    //     } else {
    //         console.error('Failed to add new trip:', response.error)
    //     }
    // }



    return (
        <div>
            <h2>Trip</h2>
            {activeTrips.length > 0 ? (
                activeTrips.map((trip) => (
                    <div key={trip.id} className="trip-container">
                        {editingTripId === trip.id ? (
                             <form onSubmit={(e) => handleSave(e, trip.id)}>
                                <div>
                                    <label>Country:</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={trip.country}
                                        onChange={(e) => handleFormChange(e, trip.id)}
                                    />
                                </div>
                                <div>
                                    <label>City:</label>
                                    <input
                                        type="city"
                                        name="city"
                                        value={trip.city}
                                        onChange={(e) => handleFormChange(e, trip.id)}
                                    />
                                </div>
                                <div>
                                    <label>Start Date:</label>
                                    <input
                                        type="date"
                                        name="start_date"
                                        value={trip.start_date}
                                        onChange={(e) => handleFormChange(e, trip.id)}
                                    />
                                </div>
                                <div>
                                    <label>End Date:</label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={trip.end_date}
                                        onChange={(e) => handleFormChange(e, trip.id)}
                                    />
                                </div>
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditingTripId(false)}>Cancel</button>
                            </form>                    
                        ) : (
                            <>
                                {/* <div>{trip.id}</div> */}
                                <div>{trip.country}, {trip.city}</div>
                                <div></div>
                                <div>{trip.start_date} - {trip.end_date}</div>
                                <button onClick={() => setEditingTripId(trip.id)}>Edit</button>
                            </>
                        )}
                    </div>
                ))
            ) : (
                <div>
                    <p>No active trip available. Please add a new trip.</p>
                </div>
            )}
            
            {activeTrips.length > 0 && (
                <div className="flex gap-10">
                    <button onClick={() => setActiveTab("Intinerary")}>Intinerary</button>
                    <button onClick={() => setActiveTab("Good to know")}>Good to know</button>
                    <button onClick={() => setActiveTab("Must see")}>Must see</button>
                    <button onClick={() => setActiveTab("Explore")}>Explore</button>
                    <button onClick={() => setActiveTab("Hidden gems")}>Hidden gems</button>
                </div>
            )}

            {activeTrips.length > 0 && (
                <div>
                    {switchTab()}
                </div>
            )}

            <ul className="flex gap-10">
                <li key="home"><Link href="/">Home</Link></li>
                <li key="gems"><Link href="/gem-locator">Gem Locator</Link></li>
                <li key="surveyTrip"><Link href="/survey-trip">Add New Trip</Link></li>
                <li key="pastTrips"><Link href="/past-trips">Past Trips</Link></li>
                <li key="userAccount"><Link href="/user-account">My Account</Link></li>
            </ul>
        </div>  
    ); 
}