'use client'

import { useState } from "react";

import SearchBar from "../components/SearchBar";
import { Gems } from "../controllers/gemController";

export default function GemLocator() {
    
    // const [gems, setGems] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [selectedGem, setSelectedGem] = useState(null);

    const handleSearch = async (searchTerm) => {
        if (searchTerm.length > 1) {
            try {
                const response = await Gems.readGemsByCity(searchTerm);
                if (response.success) {
                setSuggestions(response.data); //update suggestions with matching gems 
                } else {
                    console.error('Error fetching suggestions: ', response.error);
                    setSuggestions([]);
                }
            } catch (error) {
                console.error('Unexpected error fetching suggestions: ', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]); //clear suggestions if search term is too short
        }
        };

        const handleSelectedGem = (gem) => {
            setSelectedGem(gem); //update selected gem with the chosen gem's data
            setSuggestions([]); //clear
        };
    

        return (
            <div className="gem-locator">
                <h2>Gem Locator</h2>
                <SearchBar onSearch={handleSearch} />

                {/* displaying suggestions below the search bar */}
                {suggestions.length > 0 && (
                    <ul className="sugesstions-list">
                        {suggestions.map((gem) => (
                            <li
                                key={gem.id}
                                onClick={() => handleSelectedGem(gem)}
                                className="suggestion-item"
                            >
                                {gem.city}, {gem.country}
                            </li>
                        ))}
                    </ul>
                )}

                {/* selected gem details */}
                {selectedGem && (
                    <div className="gem-details">
                        <h3>{selectedGem.name}</h3>
                        <p>Country: {selectedGem.country}</p>
                        <p>City: {selectedGem.city}</p>
                        <p>Location: {selectedGem.location}</p>
                        <p>Description: {selectedGem.description}</p>
                        {selectedGem.picture && (
                            <img src={selectedGem.picture} alt={selectedGem.name} className="gem-picture" />
                        )}
                    </div>
                )}

            </div>
        )
    }