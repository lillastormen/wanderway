'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../components/SearchBar";
import { Gems } from "../controllers/gemController";


export default function GemLocator() {
    
    const router = useRouter();
    const [suggestions, setSuggestions] = useState([])
    const [selectedGems, setSelectedGems] = useState(null);
   

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

        // const handleSearchButtonClick = async (searchTerm) => {
        //     if (searchTerm.length > 1) {
        //         await handleSearch(searchTerm);; //trigger search on button click
        //     }
        // };

        const handleSelectedGem = (gem) => {
                setSelectedGems(gem); //update selected gem with the chosen gem's data
                setSuggestions([]); //clear
        }

        const handleAddGem = () => {
            router.push("/add-gems");
        };

    

        return (
            <div className="gem-locator">
                <h2>Gem Locator</h2>
                <SearchBar onSearch={handleSearch} />
                <button onClick={handleAddGem} className="add-gem-button">+</button>

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
                {selectedGems && (
                    <div className="gem-details">
                        <h3>{selectedGems.name}</h3>
                        <p>Country: {selectedGems.country}</p>
                        <p>City: {selectedGems.city}</p>
                        <p>Location: {selectedGems.location}</p>
                        <p>Description: {selectedGems.description}</p>
                        {selectedGems.picture && (
                            <img src={selectedGems.picture} alt={selectedGems.name} className="gem-picture" />
                        )}
                    </div>
                )}

            </div>
        )
    }
