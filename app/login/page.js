"use client";

import React, { use, useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { login } from "./actions";
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('FormData:', formData);

    try {
        const user = await login(formData); // Calls the `login` action from `actions.js`
        console.log(user);
        localStorage.setItem('userId', user.id);
        router.push('/trip');
      } catch (err) {
        setError(err.message);
      }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
 
        justifyContent: "center",
        minHeight: "70vh",
        padding: 2,
        textAlign: "center",
      }}
    >
      {/* <Typography variant="h4" gutterBottom>Login</Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2, width: "100%", maxWidth: 400 }}>
          {error}
        </Alert>
      )} */}
      <form style={{ width: "100%", maxWidth: 400 }} onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          sx={{ mb: 2 }}
          required
        />
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
                }}
                >
                Log In
            </Button>
        </Box>
      </form>
    </Box>
  );
}
