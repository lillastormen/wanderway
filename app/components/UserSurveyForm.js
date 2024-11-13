

// import React from "react";
// import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";

// export default function UserSurveyForm({ formData, handleFormChange, handleFormSubmit }) {
//   return (
//     <Box component="form" onSubmit={handleFormSubmit} sx={{ padding: 3, maxWidth: 500, mx: "auto" }}>
//       <Typography variant="h5" gutterBottom>User Info</Typography>

//       {/* Name */}
//       <TextField
//         fullWidth
//         label="Name"
//         variant="outlined"
//         margin="normal"
//         name="name"
//         value={formData.name}
//         onChange={handleFormChange}
//       />

//       {/* Email */}
//       <TextField
//         fullWidth
//         label="Email"
//         variant="outlined"
//         margin="normal"
//         name="email"
//         value={formData.email}
//         onChange={handleFormChange}
//       />

//       {/* Age Group */}
//       <FormControl component="fieldset" margin="normal">
//         <FormLabel component="legend">Age Group</FormLabel>
//         <RadioGroup name="age_group" value={formData.age_group} onChange={handleFormChange}>
//           {["-25", "25-31", "32-38", "39-45", "45+"].map((age, index) => (
//             <FormControlLabel key={index} value={age} control={<Radio />} label={age} />
//           ))}
//         </RadioGroup>
//       </FormControl>

//       {/* Gender */}
//       <FormControl component="fieldset" margin="normal">
//         <FormLabel component="legend">Gender</FormLabel>
//         <RadioGroup name="gender" value={formData.gender} onChange={handleFormChange}>
//           {["female", "male", "non-binary", "prefer-not-to-say"].map((gender, index) => (
//             <FormControlLabel key={index} value={gender} control={<Radio />} label={gender.charAt(0).toUpperCase() + gender.slice(1)} />
//           ))}
//         </RadioGroup>
//       </FormControl>

//       {/* Traveler Type */}
//       <FormControl component="fieldset" margin="normal">
//         <FormLabel component="legend">Traveler Type</FormLabel>
//         <RadioGroup name="traveler_type" value={formData.traveler_type} onChange={handleFormChange}>
//           {["solo", "friends", "family"].map((type, index) => (
//             <FormControlLabel key={index} value={type} control={<Radio />} label={type.charAt(0).toUpperCase() + type.slice(1)} />
//           ))}
//         </RadioGroup>
//       </FormControl>

//       {/* Interests */}
//       <FormControl component="fieldset" margin="normal">
//         <FormLabel component="legend">Interests</FormLabel>
//         <FormGroup>
//           {[
//             "Museums", "Art-galleries", "Nightlife", "Food", "Hiking", 
//             "Beaches", "Shopping", "Music", "Theater", "Architecture", "Photo Ops"
//           ].map((interest, index) => (
//             <FormControlLabel
//               key={index}
//               control={
//                 <Checkbox
//                   name="interest"
//                   value={index + 1}
//                   checked={formData.interests.includes((index + 1).toString())}
//                   onChange={handleFormChange}
//                 />
//               }
//               label={interest}
//             />
//           ))}
//         </FormGroup>
//       </FormControl>

//       <Button 
//         type="submit"
//         variant="contained" 
//         color="primary" 
//         size="large"
//         sx={{
//           fontWeight: "normal",
//           width: '100%',
//           borderRadius: 1,
//           marginTop: 1,
//           backgroundColor: '#1976d2',
//           '&:hover': {
//             backgroundColor: '#1565c0',
//           },
//         }}
//       >
//         CONFIRM
//       </Button>
//     </Box>
//   );
// }

'use client';

import { Box, Button, FormControl, FormLabel, Typography, TextField } from "@mui/material";

const buttonStyle = {
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: 1,
    padding: "5px 9px",
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
    <Box component="form" onSubmit={handleFormSubmit} sx={{ mx: "auto" }}>
      <Typography variant="h5" gutterBottom>User Info</Typography>
     
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Age Group</FormLabel>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          {["-25", "25-31", "32-38", "39-45", "45+"].map((age, index) => (
            <Button
              key={index}
              variant={formData.age_group === age }
              onClick={() => handleFormChange({ target: { name: "age_group", value: age } })}
              sx={{
                ...buttonStyle,
                backgroundColor: formData.age_group === age ? "grey" : "white",
                color: formData.age_group === age ? "white" : "grey",
              }}
            >
              {age}
            </Button>
          ))}
        </Box>
      </FormControl>

    
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Gender</FormLabel>
        <Box sx={{ display: "flex", flexDirection: "row", gap: '2px'}}>
          {["female", "male", "non-binary", "prefer-not-to-say"].map((gender, index) => (
            <Button
              key={index}
              variant={formData.gender === gender}
              onClick={() => handleFormChange({ target: { name: "gender", value: gender } })}
              sx={{
                ...buttonStyle,
                backgroundColor: formData.gender === gender ? "grey" : "white",
                color: formData.gender === gender ? "white" : "grey",
              }}
            >
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </Button>
          ))}
        </Box>
      </FormControl>


      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Traveler Type</FormLabel>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          {["solo", "friends", "family"].map((traveler_type, index) => (
            <Button
              key={index}
              variant={formData.traveler_type === traveler_type}
              onClick={() => handleFormChange({ target: { name: "traveler_type", value: traveler_type } })}
              sx={{
               ...buttonStyle,
               backgroundColor: formData.traveler_type === traveler_type ? "grey" : "white",
               color: formData.traveler_type === traveler_type ? "white" : "grey",
              }}
            >
              {traveler_type.charAt(0).toUpperCase() + traveler_type.slice(1)}
            </Button>
          ))}
        </Box>
      </FormControl>


      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Interests</FormLabel>
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
                backgroundColor: formData.interests.includes((index + 1).toString()) ? "grey" : "white",
                color: formData.interests.includes((index + 1).toString()) ? "white" : "grey",
              }}
            >
              {interest}
            </Button>
          ))}
        </Box>
      </FormControl>

      <Typography variant="" gutterBottom>Login info</Typography>

        
        <TextField
        fullWidth
        label="Name"
        variant="outlined"
        margin="normal"
        name="name"
        value={formData.name}
        onChange={handleFormChange}
        />


        <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        name="email"
        value={formData.email}
        onChange={handleFormChange}
        />


        <TextField
        fullWidth
        label="Password"
        variant="outlined"
        margin="normal"
        name="password"
        value={formData.password}
        onChange={handleFormChange}
        />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        sx={{
          fontWeight: "normal",
          width: '100%',
          borderRadius: 1,
          marginTop: 1,
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        }}
      >
        CONFIRM
      </Button>
    </Box>
  );
}
