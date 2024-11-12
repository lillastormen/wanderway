// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Header() {

    return ( 
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h9">
        Wanderway
      </Typography>
    </Toolbar>
  </AppBar>
  )
};

