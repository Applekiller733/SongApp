// import type { Route } from "../+types/home";
import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/material";
import { darkTheme } from "../../themes/themes";
import Navbar from "../../reusablecomponents/navbar";
import './home.css'

export default function Home() {

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Box className='home-page'>
          <Navbar></Navbar>
        </Box>
      </ThemeProvider>
    </div>
  );
}
