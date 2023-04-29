import React, { useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grandMaLogo from './images/GrandmaLogo.svg';


import CardGrid from './containers/cardGrid.jsx';

// Generate MUI theme by returning theme object
const theme = createTheme({
  // Customize theme configuration variables
  palette: {
    primary: {
      main: '#332F2A',
    },
    secondary: {
      main: '#DDBEA9',
    },
    ternary: {
      main: '#CB997E',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat', 
    ].join(','),
  },
  components: { 
    MuiPaper: { 
      // Overrides MUI style but not sure where it is being used
      styleOverrides: { 
        root: {
          'background': '#DDBEA9',
        }
        
      }
      
    }},
});
// Renders app with MUI styling 
function App() {
  return (
    // ThemeProvider from MUI : inject theme into entire application (relies on the context feature of React)
    <ThemeProvider theme={theme}>
     
        <Grid container xs={12} sx={{marginTop: 10, justifyContent: 'center',alignItems: 'center'}} >
          <Grid item xs={7} >
            <Typography align="right" variant="h1" color="primary">
              GRANDMA'S 
            </Typography>
            <Typography align="right" variant="h1" color="primary" sx={{fontFamily: 'Charmonman', m:2}}>
              Cookbook
            </Typography>
            
          </Grid>
          <Grid item xs={5} align='left'> 
            <img src={grandMaLogo} alt="" />
          </Grid>
          {/* <img src={applePie} alt="" /> */}
        </Grid>

        <CardGrid />
     
      
    </ThemeProvider>
  );
}

export default App;
