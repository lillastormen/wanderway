
import { useState } from "react"
import { TextField, IconButton, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import cities from '/data/cities.json';

export default function SearchBar({ onSearch, onAutocompleteChange }) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

    };

    // const handleSearchButtonClick = () => {
    //     onSearch(searchTerm);
    // };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Autocomplete
            disablePortal
            options={cities}
            getOptionLabel={(option) => `${option.label}, ${option.country}`} // Combine city and country
            onInputChange={handleInputChange} // Update the search term when the user types
            onChange={(event, value) => {
                if (value) {
                    setSearchTerm(`${value.label}, ${value.country}`); // Set the selected value
                    onAutocompleteChange(event, value); // Trigger search on selection
                }
            }}
            renderInput={(params) => (
                <TextField 
                    {...params}
                    label="City, Country"
                    variant="outlined"
                    fullWidth
                    size="small"
                />
            )}
            sx={{ flexGrow: 1 }} // Make autocomplete fill available space
        />
        {/* <IconButton onClick={handleSearchButtonClick}>
            <SearchIcon />
        </IconButton> */}
    </div>
    );
}