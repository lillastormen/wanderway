import { TextField, Autocomplete, Radio, RadioGroup, FormControl, FormControlLabel, Typography, Box, Button, Stack } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function TripForm({ formData, handleFormChange, handleFormSubmit, cities }) {

    return (
        <Box sx={{ padding: 1, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>Trip Info</Typography>
            <form onSubmit={handleFormSubmit}>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="body2" fontWeight="bold">Destination</Typography>
                        <Autocomplete
                            disablePortal
                            options={cities}
                            getOptionLabel={(option) => `${option.label}, ${option.country}`}
                            onChange={(event, value) => {
                                handleFormChange({
                                    target: {
                                        name: 'city',
                                        value: value?.label || "",
                                    }
                                });
                                handleFormChange({
                                    target: {
                                        name: 'country',
                                        value: value?.country || "",
                                    }
                                });
                            }}
                            renderInput={(params) => <TextField {...params} label="City, Country" variant="outlined" fullWidth />}
                        />
                    </Box>
                    <Box>
                        <Typography variant="body2" fontWeight="bold">Start Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    value={formData.start_date}
                                    onChange={(newValue) => handleFormChange({ target: { name: 'start_date', value: newValue } })}
                                    views={['year', 'month', 'day']}
                                    renderInput={(params) => <TextField {...params} label="Start Date" variant="outlined" fullWidth />}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <Typography variant="body2" fontWeight="bold">End Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    value={formData.end_date}
                                    onChange={(newValue) => handleFormChange({ target: { name: 'end_date', value: newValue } })}
                                    views={['year', 'month', 'day']}
                                    renderInput={(params) => <TextField {...params} label="End Date" variant="outlined" fullWidth />}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box>
                        <Typography variant="body2" fontWeight="bold">Budget</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                name="budget"
                                value={formData.budget}
                                onChange={handleFormChange}
                            >
                                <FormControlLabel
                                    value="explorer"
                                    control={<Radio />}
                                    label="Explorer"
                                />
                                <FormControlLabel
                                    value="comfort"
                                    control={<Radio />}
                                    label="Comfort"
                                />
                                <FormControlLabel
                                    value="indulge"
                                    control={<Radio />}
                                    label="Indulge"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <Typography variant="body2" fontWeight="bold">Peace</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup
                                name="peace"
                                value={formData.peace}
                                onChange={handleFormChange}
                            >
                                <FormControlLabel
                                    value="relaxed"
                                    control={<Radio />}
                                    label="Relaxed"
                                />
                                <FormControlLabel
                                    value="adventurer"
                                    control={<Radio />}
                                    label="Adventurer"
                                />
                                <FormControlLabel
                                    value="thrill-seeker"
                                    control={<Radio />}
                                    label="Thrill-seeker"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Button 
                        variant="contained" 
                        type="submit"
                        color="primary"
                        size="large"
                        sx={{ marginTop: 2 }} 
                    >
                        Ready!
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}
