import React, { useState } from 'react';
import { Typography, AppBar, Container, Toolbar, MuiPaper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardGrid from './containers/cardGrid.jsx';

// Generate MUI theme by returning theme object
const theme = createTheme({
  // Customize theme configuration variables
  palette: {
    primary: {
      main: '#FFE8D6',
    },
    secondary: {
      main: '#DDBEA9',
    },
    ternary: {
      main: '#CB997E',
    },
  },
  components: { 
    MuiPaper: { 
      // Overrides MUI style but not sure where it is being used
      styleOverrides: { 
        root: {
          'background': '#DDBEA9',
        }
      }
    }}
});
// Renders app with MUI styling 
function App() {
  return (
    // ThemeProvider from MUI : inject theme into entire application (relies on the context feature of React)
    <ThemeProvider theme={theme}>
      <header>
        {/* Typography: MUI component that uses typographic scale with limited set of type sizes */}
        <Typography align="center" variant="h1" color="primary">
          {"Grandma's Cookbook"}
        </Typography>
        {/* Confusion: not sure why it is called actionHeader */}
        <div className="actionHeader">
          <Typography variant="h2" align="center" color="primary">
            Recipes
          </Typography>
        </div>
      </header>
      <CardGrid />
    </ThemeProvider>
  );
}

export default App;
