import Link from "next/link";
import Image from "next/image";
import { Box, Typography, Button } from "@mui/material";


export default function Home() {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        // gap: 5,
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