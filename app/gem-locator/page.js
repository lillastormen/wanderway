'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../components/SearchBar";
import { Gems } from "../controllers/gemController";


export default function GemLocator() {
    
    const router = useRouter();
    // const [suggestions, setSuggestions] = useState([])
    const [selectedGems, setSelectedGems] = useState(null);
    const [noResults, setNoResults] = useState(false);
   

    const handleSearch = async (searchTerm) => {
        if (searchTerm && searchTerm.length > 1) {
            try {
                const response = await Gems.readGemsByCity(searchTerm);
                if (response.success && response.data.length > 0) {
                    setSelectedGems(response.data);
                    setNoResults(false);
                } else {
                    setSelectedGems([]);
                    setNoResults(true);
                }
            } catch (error) {
                console.error('Unexpected error fetching suggestions: ', error);
                setSelectedGems([]);
                setNoResults(true);
            }
        } else {
            setSelectedGems([]); //clear suggestions 
            setNoResults(false);
        }
        };

        // const handleSearchButtonClick = async (searchTerm) => {
        //     if (searchTerm.length > 1) {
        //         await handleSearch(searchTerm);; //trigger search on button click
        //     }
        // };

  

        const handleAddGem = () => {
            router.push("/add-gems");
        };

    

        return (
            <div className="gem-locator">
                <h2>Gem Locator</h2>
                <SearchBar onSearch={handleSearch} />
                <button onClick={handleAddGem} className="add-gem-button">+</button>

                {/* displaying suggestions below the search bar */}
                {selectedGems && selectedGems.length > 0 && (
                    <ul className="sugesstions-list">
                       
                            <li
                                onClick={() => setSelectedGems(selectedGems)}
                                className="suggestion-item"
                            >
                                
                            </li>
                        
                    </ul>
                )}

                {/* {noResults && (
                    <div className="no-results">
                        <p>No results found for the entered city.</p>
                    </div>
                )} */}
                {/* selected gem details */}
                {selectedGems && selectedGems.length > 0 && (
                    <div className="gem-details">
                    {selectedGems.map((gem) => (
                        <div key={gem.id} className="gem-detail-item">
                            <h3>{gem.name}</h3>
                            <p>Country: {gem.country}</p>
                            <p>City: {gem.city}</p>
                            <p>Location: {gem.location}</p>
                            <p>Description: {gem.description}</p>
                            {gem.picture && (
                                <img src={gem.picture} alt={gem.name} className="gem-picture" />
                            )}
                        </div>
                    ))}
                </div>
                )}

            </div>
        )
    }
