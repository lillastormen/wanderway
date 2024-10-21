'use client'

import { useState } from "react";

export default function Trip() {

    const [activeTab, setActiveTab] = useState("Intinerary");

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


    return (
    <div>
        <h2>Trip</h2>
        <div>Place</div>
        <div>Date</div>
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
    </div>
    );
  }
  