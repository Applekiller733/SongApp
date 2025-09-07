import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "../themes/themes";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import type { User } from "../models/user";
import { selectCurrentUser } from "../stores/slices/userdataslice";
import { useSelector } from "react-redux";
import './navbar.css';
import { useAppDispatch, useDeleteCurrentUser } from "../hooks/hooks";
import { logout } from "../stores/thunks/userthunks";


export default function Navbar() {
  const currentuser: User = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  // const deleteCurrentUserHook = useDeleteCurrentUser();

  useEffect(() => {
    setLoggedIn(currentuser !== undefined && currentuser.id !== undefined);
  }, [currentuser])

  async function handleLogout() {
    await dispatch(logout());
    // const emptyuser: User = {
    //   id: undefined,
    //   username: '',
    //   email: '',
    //   role: '',
    //   token: '',
    // }
    // deleteCurrentUserHook(emptyuser);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" className="navbar">
        <Toolbar className="navbar-toolbar">

          <Typography variant="h6" className="navbar-title">
            SongApp
          </Typography>


          <Box className="navbar-links">
            <Button color="inherit" href='/'>Home</Button>
            {/* <Button color="inherit">About</Button>
                 */}
          </Box>


          <Box className="navbar-auth">
            {loggedIn !== true ?
              <>
                <Button color="primary" href='/login'>Login</Button>
                <Button variant="contained" color="secondary" href='/signup'>
                  Sign Up
                </Button>
              </>
              :
              <>
                <Button color="error" onClick={handleLogout}>Logout</Button>
              </>
            }
          </Box>

          <Box className="navbar-profile">
            {
              loggedIn && 
              <>
                <Button color="inherit" href={`/profile/${currentuser.id}`}>Profile</Button>
              </>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}