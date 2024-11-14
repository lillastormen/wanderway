import { TextField, Autocomplete, Radio, RadioGroup, FormControl, FormControlLabel, Typography, Box, Button, Stack } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const buttonStyle = {
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: 1,
    padding: "8px",
    display: "inline-block",
    cursor: "pointer",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.6)",
    '&.Mui-selected': {
        borderColor: "#89b0d6",
        borderWidth: "3px",
    }
};

export default function TripForm({ formData, handleFormChange, handleDestination, handleFormSubmit, cities }) {

    const handleButtonClick = (e, name) => {
        handleFormChange({
          target: {
            name,
            value: e.target.value,
          }
        });
      };

    return (
        <Box sx={{ padding: 1, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h5" paddingTop={2} paddingBottom={1} gutterBottom>Trip Info</Typography>
            <form onSubmit={handleFormSubmit}>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '0.885 rem', fontWeight: "bold" }} color="rgba(0, 0, 0, 0.6)" paddingBottom={1}>Destination</Typography>
                        <Autocomplete
                            disablePortal
                            options={cities}
                            getOptionLabel={(option) => `${option.label}, ${option.country}`}
                            onChange={(event, value) => {
                                handleDestination({
                                    country: value?.country || "",
                                    city: value?.label || "",
                                });
                            }}
                            renderInput={(params) => <TextField {...params} label="City, Country" variant="outlined" fullWidth sx={{ backgroundColor: 'white' }} />}
                        />
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '0.885 rem', fontWeight: "bold" }} color="rgba(0, 0, 0, 0.6)">Start Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    value={formData.start_date}
                                    onChange={(newValue) => handleFormChange({ target: { name: 'start_date', value: newValue } })}
                                    views={['year', 'month', 'day']}
                                    sx={{backgroundColor: "white"}}
                                    renderInput={(params) => 
                                        <TextField 
                                            {...params} 
                                            label="Start Date" 
                                            variant="outlined" 
                                            fullWidth  
                                            className="textFieldCustomColor"
                                        />
                                    }
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '0.885 rem', fontWeight: "bold" }} color="rgba(0, 0, 0, 0.6)">End Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} >
                                <DatePicker
                                    value={formData.end_date}
                                    onChange={(newValue) => handleFormChange({ target: { name: 'end_date', value: newValue } })}
                                    views={['year', 'month', 'day']}
                                    sx={{backgroundColor: "white"}}
                                    renderInput={(params) => 
                                        <TextField 
                                        {...params} 
                                        label="End Date" 
                                        variant="outlined" 
                                        fullWidth 
                                        sx={{
                                            '& .MuiInputBase-root': {
                                              color: 'rgba(0, 0, 0, 0.6' // Change the text color inside the input field
                                            }}}
                                        />
                                    }
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '0.885 rem', fontWeight: "bold" }} color="rgba(0, 0, 0, 0.6)">Budget</Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            {["explorer", "comfort", "indulge"].map((value) => (
                                <Button
                                key={value}
                                value={value}
                                onClick={(e) => handleButtonClick(e, "budget")}
                                sx={{
                                    ...buttonStyle,
                                    borderColor: formData.budget === value ? "#89b0d6" : "grey",
                                    borderWidth: formData.budget === value ? "3px" : "1px",
                                }}
                                >
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                                </Button>
                            ))}
                            </Box>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ fontSize: '0.885 rem', fontWeight: "bold" }} color="rgba(0, 0, 0, 0.6)">Peace</Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        {["relaxed", "adventurer", "thrill-seeker"].map((value) => (
                            <Button
                            key={value}
                            value={value}
                            onClick={(e) => handleButtonClick(e, "peace")}
                            sx={{
                                ...buttonStyle,
                                borderColor: formData.peace === value ? "#89b0d6" : "grey",
                                borderWidth: formData.peace === value ? "3px" : "1px",
                            }}
                            >
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                            </Button>
                        ))}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                width: '50%',
                                margin: '0 auto',
                                borderRadius: 1,
                                marginTop: 2,
                                marginBottom: 3,
                                backgroundColor: '#1976d2',
                            }}
                            >
                            Ready!
                        </Button>
                    </Box>
                </Stack>
            </form>
        </Box>
    );
}
