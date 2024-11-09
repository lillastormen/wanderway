
'use client'

import Link from "next/link";
import { useState } from "react";
import { Stack, Button, BottomNavigation, BottomNavigationAction, Box, Paper } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
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
                    // showLabels
                    value={value}
                    onChange={handleChange}
                    sx={{
                    
                        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
                        borderTop: '1px solid #e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        height: 75 
                    }}
                >
                    <BottomNavigationAction
                        label="Home"
                        value="/trip"
                        icon={<HomeOutlinedIcon sx={{ fontSize: 41}}/>}
                        sx={{ 
                            minWidth: 0, 
                            padding: 0, 
                            lineHeight: 0,
                            '& .MuiBottomNavigationAction-label': {
                                marginTop: 0.5, 
                            },
                        }}
                    />    
                    <BottomNavigationAction
                        label="Gem Locator"
                        value="/gem-locator"
                        icon={<RoomOutlinedIcon sx={{ fontSize: 35}}/>}
                        sx={{ 
                            minWidth: 0, 
                            padding: 0, 
                            lineHeight: 0,
                            '& .MuiBottomNavigationAction-label': {
                                marginTop: 0.5, 
                            },
                        }}
                    />
                    <BottomNavigationAction
                        label="Add New Trip"
                        value="/survey-trip"
                        icon={<AddBoxOutlinedIcon sx={{ fontSize: 35}}/>}
                        sx={{ 
                            minWidth: 0, 
                            padding: 0, 
                            lineHeight: 0,
                            '& .MuiBottomNavigationAction-label': {
                                marginTop: 0.5,
                            },
                        }}
                    />
                    <BottomNavigationAction
                        label="Past Trips"
                        value="/past-trips"
                        icon={<CheckCircleOutlineOutlinedIcon sx={{ fontSize: 35}}/>}
                        sx={{ 
                            minWidth: 0, 
                            padding: 0, 
                            lineHeight: 0,
                            '& .MuiBottomNavigationAction-label': {
                                marginTop: 0.5, 
                            },
                        }}
                    />
                    <BottomNavigationAction
                        label="My Account"
                        value="/user-account"
                        icon={<Person2OutlinedIcon sx={{ fontSize: 35}} />}
                        sx={{ 
                            minWidth: 0, 
                            padding: 0, 
                            lineHeight: 0,
                            '& .MuiBottomNavigationAction-label': {
                                marginTop: 0.5, 
                            },
                        }}
                    />
            </BottomNavigation>
        </Paper>
    );
 }