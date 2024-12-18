'use client';

import { Box, Button, FormControl, FormLabel, Typography, TextField } from "@mui/material";

const buttonStyle = {
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: 1,
    padding: "3px",
    paddingTop: "4px",
    paddingBottom: "4px",
    display: "inline-block",
    cursor: "pointer",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.6)",
   
  };

export default function UserSurveyForm({
    formData,
    handleFormChange,
    handleFormSubmit,
}) {
  
    return (
        <Box component="form" onSubmit={handleFormSubmit} sx={{ mx: "auto", padding: 1 }}>
            <Typography variant="h5" paddingTop={2} gutterBottom>Register</Typography>
            
            <FormControl component="fieldset" margin="normal">
                <FormLabel sx={{ variant: "body1", fontWeight: "bold", color:"#30323D", paddingBottom: 1}}>Age Group</FormLabel>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1}}>
                        {["-25", "25-31", "32-38", "39-45", "45+"].map((age, index) => (
                            <Button
                            key={index}
                            variant={formData.age_group === age }
                            onClick={() => handleFormChange({ target: { name: "age_group", value: age } })}
                            sx={{
                                ...buttonStyle,
                                borderColor: formData.age_group === age ? "#89b0d6" : "grey",
                                borderWidth: formData.age_group === age ? "3px" : "1px",
                            }}
                            >
                            {age}
                            </Button>
                        ))}
                    </Box>
            </FormControl>
    
            <FormControl component="fieldset" margin="normal">
            <FormLabel sx={{ variant: "body1", fontWeight: "bold", color:"#30323D", paddingBottom: 1}}>Gender</FormLabel>
                <Box sx={{ display: "flex", flexDirection: "row", gap: '2px'}}>
                {["female", "male", "non-binary", "prefer-not-to-say"].map((gender, index) => (
                    <Button
                    key={index}
                    variant={formData.gender === gender}
                    onClick={() => handleFormChange({ target: { name: "gender", value: gender } })}
                    sx={{
                        ...buttonStyle,
                        borderColor: formData.gender === gender ? "#89b0d6" : "grey", 
                        borderWidth: formData.gender === gender ? "3px" : "1px", 
                    }}
                    >
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </Button>
                ))}
                </Box>
            </FormControl>

            <FormControl component="fieldset" margin="normal">
            <FormLabel sx={{ variant: "body1", fontWeight: "bold", color:"#30323D", paddingBottom: 1}}>Traveler Type</FormLabel>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1}}>
                {["solo", "friends", "family"].map((traveler_type, index) => (
                    <Button
                    key={index}
                    variant={formData.traveler_type === traveler_type}
                    onClick={() => handleFormChange({ target: { name: "traveler_type", value: traveler_type } })}
                    sx={{
                    ...buttonStyle,
                    borderColor: formData.traveler_type === traveler_type ? "#89b0d6" : "grey",
                    borderWidth: formData.traveler_type === traveler_type ? "3px" : "1px",
                    }}
                    >
                    {traveler_type.charAt(0).toUpperCase() + traveler_type.slice(1)}
                    </Button>
                ))}
                </Box>
            </FormControl>

            <FormControl component="fieldset" margin="normal">
                <FormLabel sx={{ variant: "body1", fontWeight: "bold", color:"#30323D", paddingBottom: 1}}>Interests</FormLabel>
                <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 1 }}>
                {[
                    "Museums", "Art-galleries", "Nightlife", "Food", "Hiking", 
                    "Beaches", "Shopping", "Music", "Theater", "Architecture", "Photo Ops"
                ].map((interest, index) => (
                    <Button
                        key={index}
                        variant={formData.interests.includes((index + 1).toString()) }
                        onClick={() => handleFormChange({
                            target: { 
                            name: "interest", 
                            value: (index + 1).toString(), 
                            type: "checkbox",
                            checked: !formData.interests.includes((index + 1).toString())
                            }
                        })}
                        sx={{
                            ...buttonStyle,
                            borderColor: formData.interests.includes((index + 1).toString()) ? "#89b0d6" : "grey",
                            borderWidth: formData.interests.includes((index + 1).toString()) ? "3px" : "1px",
                        }}
                        >
                        {interest}
                    </Button>
                ))}
                </Box>
            </FormControl>

            <Typography variant="body1" sx={{ fontWeight: "bold" }} color="#30323D" paddingBottom={1} paddingTop={2}>Login Credentials</Typography>
                <Box autoComplete="off" sx={{ display: "flex", flexDirection: "column", mt: -2, mb: 2 }}>
                    <TextField
                        fullWidth
                        placeholder="Name"
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        sx={{
                            backgroundColor: "white",
                            marginBottom: "1px", 
                        }} 
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        sx={{
                            backgroundColor: "white",
                            marginBottom: "1px", 
                        }} 
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        password="Password"
                        variant="outlined"
                        margin="normal"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        sx={{
                            backgroundColor: "white",
                            marginBottom: "1px", 
                        }} 
                    />
                </Box>
            
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                        fontWeight: "normal",
                        width: '50%',
                        margin: '0 auto',
                        borderRadius: 1,
                        marginTop: 2,
                        marginBottom: 3,
                        }}
                    >
                    CONFIRM
                    </Button>
                </Box>
        </Box>
  );
}
