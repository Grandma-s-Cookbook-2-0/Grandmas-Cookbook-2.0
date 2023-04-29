import React, { useState } from 'react';
import { Typography, AppBar, Container, Toolbar, MuiPaper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardGrid from './containers/cardGrid.jsx';
// MUI styling
const theme = createTheme({
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
    <ThemeProvider theme={theme}>
      <header>
        <Typography align="center" variant="h1" color="primary">
          {"Grandma's Cookbook"}
        </Typography>
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
