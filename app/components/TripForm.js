import { TextField, Autocomplete, Typography, Box, Button, Stack } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CircularProgress from '@mui/material/CircularProgress';


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

export default function TripForm({ formData, handleFormChange, handleDestination, handleFormSubmit, cities, isLoading }) {

    const handleButtonClick = (e, name) => {
        handleFormChange({
          target: {
            name,
            value: e.target.value,
          }
        });
      };

    
    if(!formData) {
        return <></>;
    }
    return (
        <Box sx={{ padding: 1, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h5" paddingTop={2} paddingBottom={1} gutterBottom>Define your trip</Typography>
            <form onSubmit={handleFormSubmit}>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }} color="#30323D)" paddingBottom={1}>Destination</Typography>
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
                            renderInput={(params) => <TextField {...params} label="City, Country..." variant="outlined" fullWidth sx={{ backgroundColor: 'white' }} />}
                        />
                    </Box>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }} color="#30323D)" paddingBottom={1}>Dates</Typography>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    value={formData.start_date}
                                    onChange={(newValue) => handleFormChange({ target: { name: 'start_date', value: newValue } })}
                                    views={['year', 'month', 'day']}
                                    label="Start date"
                                    sx={{backgroundColor: "white"}}
                                    renderInput={(params) => 
                                        <TextField 
                                            {...params} 
                                            label="Start Date" 
                                            variant="outlined" 
                                            fullWidth  
                                        />
                                    }
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} >
                                <DatePicker
                                    value={formData.end_date}
                                    onChange={(newValue) => handleFormChange({ target: { name: 'end_date', value: newValue } })}
                                    views={['year', 'month', 'day']}
                                    label="End date"
                                    sx={{backgroundColor: "white"}}
                                    renderInput={(params) => 
                                        <TextField 
                                        {...params} 
                                            variant="outlined" 
                                            fullWidth 
                                        />
                                    }
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }} color="#30323D">Budget</Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            {["backpacker", "comfort", "premium"].map((value) => (
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
                        <Typography variant="body1" sx={{ fontWeight: "bold" }} color="#30323D">Peace</Typography>
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
                            disabled={isLoading}
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{
                                width: '50%',
                                margin: '0 auto',
                                borderRadius: 1,
                                marginTop: 2,
                                marginBottom: 3,
                            }}
                            >
                            {!isLoading ? (
                                <>                                
                                    Ready!
                                 </>
                            ) : (
                                <CircularProgress color="white" size="35px" padding={3} />
                            )}
                        </Button>
                    </Box>
                </Stack>
            </form>
        </Box>
    );
}
