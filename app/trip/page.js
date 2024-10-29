'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { Trips } from "../controllers/tripController";
import { useRouter } from "next/navigation";

export default function Trip() {

    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Intinerary");
    const [trip, setTrip] = useState({ destination: "Loading...", start_date: "Loading...", end_date: "Loading..."});
    const [tripEdit, setTripEdit] = useState(false);

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
                return <div>Hidden gems in your ares</div>
            default:
                return null;
        }
    };

    useEffect(() => { 
        const fetchTrip = async () => {
            const tripId = localStorage.getItem('trip_id');
            if (!tripId) {
                console.error('No trip ID found in the localstorage');
                return;
            }
    
            const response = await Trips.readById(tripId);
            if (response.success) {
                console.log('Fetched trip:', response.success);
                setTrip(response.data);
            } else {
                console.error('Failed to fetch trip:', response.error)
            }
        };

        fetchTrip();
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setTrip((prevTrip) => ({...prevTrip, [name]: value }))
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const tripId = localStorage.getItem('trip_id');
        const response = await Trips.update(tripId, trip);

        if (response.success) {
            console.log('Trip updated successfully!')
        } else {
            console.error('Failed to update the trip:', response.error)
        }
    };


    return (
        <div>
            <h2>Trip</h2>
            {tripEdit ? (
                <form onSubmit={handleSave}>
                <div>
                    <label>Destination:</label>
                    <input
                        type="text"
                        name="destination"
                        value={trip.destination}
                        onChange={handleFormChange}
                    />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="start_date"
                        value={trip.start_date}
                        onChange={handleFormChange}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="end_date"
                        value={trip.end_date}
                        onChange={handleFormChange}
                    />
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setTripEdit(false)}>Cancel</button>
            </form>
            ) : (
                <>
                    <div>{trip.destination}</div>
                    <div>{trip.start_date} - {trip.end_date}</div>
                    <button onClick={() => setTripEdit(true)}>Edit</button>
                </>
            )}
            
            <div className="flex gap-10">
                <button onClick={() => setActiveTab("Intinerary")}>Intinerary</button>
                <button onClick={() => setActiveTab("Good to know")}>Good to know</button>
                <button onClick={() => setActiveTab("Must see")}>Must see</button>
                <button onClick={() => setActiveTab("Explore")}>Explore</button>
                <button onClick={() => setActiveTab("Hidden gems")}>Hidden gems</button>
            </div>

            <div>
                {switchTab()}
            </div>

            <ul className="flex gap-10">
                <li><Link href="/">Home</Link></li>
                <li>Users hidden gems?</li>
                <li><Link href="/survey-trip">Add New Trip</Link></li>
                <li><Link href="/past-trips">Past Trips</Link></li>
                <li><Link href="/user-account">My account</Link></li>
            </ul>
        </div>
    );
  }
  