import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "../themes/themes";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

export default function Navbar(){
    
    return (
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static" className="navbar">
            <Toolbar className="navbar-toolbar">
              
              <Typography variant="h6" className="navbar-title">
                SongApp
              </Typography>
    
              
              <Box className="navbar-links">
                <Button color="inherit" href='/'>Home</Button>
                <Button color="inherit">About</Button>
                <Button color="inherit">Services</Button>
                <Button color="inherit">Contact</Button>
              </Box>
    
              
              <Box className="navbar-auth">
                <Button color="primary" href='/login'>Login</Button>
                <Button variant="contained" color="secondary" href='/signup'>
                  Sign Up
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      );
}