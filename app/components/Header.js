// Header.js
import React from 'react';
import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import InfoIcon from '@mui/icons-material/Info';

export default function Header() {

    const pathname = usePathname();
    const isHomePage = pathname === '/';

    return ( 
        <AppBar position="static" sx={{ height: 70 }}>
            <Toolbar 
                sx={{ 
                    display: 'flex',            
                    alignItems: 'center', 
                    justifyContent: 'space-between',    
                    height: '100%',                    
                }}
            >
            
                <Box sx={{ display: 'flex', marginLeft: '-60px' }}>
                    {!isHomePage &&
                        <Image 
                            src="/logo/wann-12.svg"
                            alt="logo-header"
                            width={200}
                            height={200}
                        />
                        }  
                </Box>
                <Box>
                    <IconButton >
                        <InfoIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
};

