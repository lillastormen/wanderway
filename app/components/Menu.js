
'use client'

import Link from "next/link";
import { useState } from "react";
import { Stack, Button, BottomNavigation, BottomNavigationAction, Box, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; 
import PlaceIcon from '@mui/icons-material/Place';
import AddIcon from '@mui/icons-material/Add';
import ArchiveIcon from '@mui/icons-material/Archive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from "next/navigation";

export default function Menu() {

    const [value, setValue] = useState('home');
    const router = useRouter();
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
        router.push(newValue);
    }

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={handleChange}
                    sx={{
                    
                        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
                        borderTop: '1px solid #e0e0e0',
                    }}
                >
                    <BottomNavigationAction
                        label="Home"
                        value="/trip"
                        icon={<HomeIcon sx={{ fontSize: 30}}/>}
                    />    
                    <BottomNavigationAction
                        label="Gem Locator"
                        value="/gem-locator"
                        icon={<PlaceIcon sx={{ fontSize: 30}}/>}
                    />
                    <BottomNavigationAction
                        label="Add New Trip"
                        value="/survey-trip"
                        icon={<AddIcon sx={{ fontSize: 30}}/>}
                    />
                    <BottomNavigationAction
                        label="Past Trips"
                        value="/past-trips"
                        icon={<ArchiveIcon sx={{ fontSize: 30}}/>}
                    />
                    <BottomNavigationAction
                        label="My Account"
                        value="/user-account"
                        icon={<AccountCircleIcon sx={{ fontSize: 30}} />}
                    />
            </BottomNavigation>
        </Paper>
    );
 }