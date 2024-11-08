'use client';

import Link from "next/link";
import { useState } from "react";
import { Users } from "../controllers/userController";
import { useRouter } from "next/navigation";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField, Typography} from "@mui/material";

export default function UserSurvey() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    age_group:'',
    gender:'',
    traveler_type:'',
    interests: [],
  });
 
  //Handle form data change
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "interest") {
      setFormData((prevData) => ({
        ...prevData,
        interests: checked
          ? [...prevData.interests, value]
          : prevData.interests.filter((interest) => interest !== value)
      }));
    } else {

    setFormData({
    ...formData, //Keep the exsisting data in the FormData state
    [name]: value //Update only the field that changed
    });
  } 
};

  //Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userData = { ...formData };
    const userInterests = formData.interests;
 
    const response = await Users.create(userData, userInterests)
      
    console.log(response);


    if (response.success) {
      const userId = response.data.id; // Assuming the user ID is returned in the response
      console.log(userId)
      alert('User addes successfully!');
      router.push(`/survey-trip?user_id=${userId}`)
    } else {
      console.error(response.error);
      alert('Failed to add user');
    }
  };


  
  return (
    <Box component="form" onSubmit={handleFormSubmit} sx={{ padding: 3, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>User Info</Typography>

      {/* Name */}
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        margin="normal"
        name="name"
        value={formData.name}
        onChange={handleFormChange}
      />

      {/* Email */}
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        name="email"
        value={formData.email}
        onChange={handleFormChange}
      />

      {/* Age Group */}
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Age Group</FormLabel>
        <RadioGroup name="age_group" value={formData.age_group} onChange={handleFormChange}>
          {["-25", "25-31", "32-38", "39-45", "45+"].map((age, index) => (
            <FormControlLabel key={index} value={age} control={<Radio />} label={age} />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Gender */}
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup name="gender" value={formData.gender} onChange={handleFormChange}>
          {["female", "male", "non-binary", "prefer-not-to-say"].map((gender, index) => (
            <FormControlLabel key={index} value={gender} control={<Radio />} label={gender.charAt(0).toUpperCase() + gender.slice(1)} />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Traveler Type */}
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Traveler Type</FormLabel>
        <RadioGroup name="traveler_type" value={formData.traveler_type} onChange={handleFormChange}>
          {["solo", "friends", "family"].map((type, index) => (
            <FormControlLabel key={index} value={type} control={<Radio />} label={type.charAt(0).toUpperCase() + type.slice(1)} />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Interests */}
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Interests</FormLabel>
        <FormGroup>
          {[
            "Museums", "Art-galleries", "Nightlife", "Food", "Hiking", 
            "Beaches", "Shopping", "Music", "Theater", "Architecture", "Photo Ops"
          ].map((interest, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  name="interest"
                  value={index + 1}
                  checked={formData.interests.includes((index + 1).toString())}
                  onChange={handleFormChange}
                />
              }
              label={interest}
            />
          ))}
        </FormGroup>
      </FormControl>

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Ready!
      </Button>
    </Box>

  );
}
