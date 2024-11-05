

import { debounce } from "lodash"
import { useState } from "react"

export default function SearchBar({ onSearch }) {
    const [searchTerm, setSerachTerm] = useState('');
  
    //debounced function for sesrching 
    const debouncedSearch = debounce((value) => {
        onSearch(value); //call onSearch with the debounced term
    }, 300); //300ms delay

 const handleInputChange = (e) => {
    const value = e.target.value;
    setSerachTerm(value);
    debouncedSearch(value); //trigger debounced searcg
 }

    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange} //update input
                placeholder="Search for a city..."
                // style={{ padding: '8px', width: '100%', marginBottom: '10px'}}
            /> 
        </div>
    );
}