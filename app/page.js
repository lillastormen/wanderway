'use client'

import Link from "next/link";
import Image from "next/image";
import { Box, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  useEffect(() => {
    if(localStorage.getItem('userId')){
      router.push('/trip')
    }
  },[]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
    <Box sx={{ mt:7 }}>
      <Image 
        src="/logo/wann-14.svg" 
        alt="Wanderway Logo" 
        width={500} 
        height={500} 
      />
    </Box>
    <Box padding={10}>
      <Typography variant="subtitle1" color="textSecondary">
        Plan your next journey.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1}}>
      <Link href="/survey-user" passHref>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          sx={{
            fontWeight: "normal",
            width: '100%',
            borderRadius: 1,
            marginTop: 4,
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          SIGN UP
        </Button>
      </Link>
      <Link href="/login" passHref>
        <Button 
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
          LOG IN
        </Button>
      </Link>
      </Box>
    </Box>
  </Box>
  );
}