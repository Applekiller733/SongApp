import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "../../themes/themes";
import { Box, Paper } from "@mui/material";
import SideList from "../../reusablecomponents/library/sidelist/sidelist";
import { useAppDispatch } from "../../hooks/hooks";
import LibraryMainPage from "./main-page/main-page";
import { useState } from "react";
import Navbar from "../../reusablecomponents/navbar";
import CreatePlaylist from "./create-playlist/create-playlist";
import "./library.css";
import ViewPlaylist from "./view-playlist/view-playlist";

export default function Library() {
    const dispatch = useAppDispatch();
    const savedplaylists = [];
    const [loadedPage, setLoadedPage] = useState('main');

    function handleCreatePlaylist() {
        setLoadedPage('create-playlist');
    }

    function handlePlaylistClick() {
        setLoadedPage('view-playlist');
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <Box className="library">
                <Navbar ></Navbar>
                <Paper className="library-paper">
                    <div className="sidelist">
                        <SideList handleCreatePlaylist={handleCreatePlaylist} handlePlaylistClick={handlePlaylistClick} />
                    </div>
                    <div className="page">
                        {loadedPage === 'main' && <LibraryMainPage></LibraryMainPage>}
                        {loadedPage === 'create-playlist' && <CreatePlaylist></CreatePlaylist>}
                        {loadedPage == 'view-playlist' && <ViewPlaylist></ViewPlaylist>}
                    </div>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}