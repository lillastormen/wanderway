'use client'

import { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction, IconButton, Paper, Menu, MenuItem, Icon } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { useRouter } from "next/navigation";

export default function BottomNav() {

    const [value, setValue] = useState('/');
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue);
        router.push(newValue);
    };

    const handleUserMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleUserMenuClose = () => {
    setAnchorEl(null);
    };

    const handleMenuItemClick = (path) => {
        handleUserMenuClose();
        if (path === "/logout") {
            localStorage.clear();
            console.log("User logged out");
            router.push("/");
        } else {
            router.push(path);
        }
    }

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
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
                        value="/trip"
                        icon={<HomeOutlinedIcon sx={{ fontSize: 45}}/>}
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
                        value="/gem-locator"
                        icon={<RoomOutlinedIcon sx={{ fontSize: 40}}/>}
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
                        value="/survey-trip"
                        icon={<AddBoxOutlinedIcon sx={{ fontSize: 40}}/>}
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
                        value="/past-trips"
                        icon={<CheckCircleOutlineOutlinedIcon sx={{ fontSize: 40}}/>}
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
                        value="/user-profile"
                        icon={
                            <Person2OutlinedIcon sx={{ fontSize: 42 }} /> 
                        }
                        onClick={handleUserMenuOpen}
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
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{
                    padding: 0, 
                    '& .MuiMenuItem-root': {
                        display: 'flex',
                        justifyContent: 'center', 
                        padding: '10px 20px', 
                        textAlign: 'center',
                    }
                }}
            >
                <MenuItem onClick={() => handleMenuItemClick("/user-profile")}>Profile</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("/user-account")}>Account</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("/logout")}>Logout</MenuItem>
            </Menu>
        
        </Paper>
    );
 }