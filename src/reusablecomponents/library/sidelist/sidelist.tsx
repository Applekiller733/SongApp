import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "../../../themes/themes";
import { Box, Button, List, ListItem, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../stores/slices/userdataslice";
import { selectOwnPlaylists } from "../../../stores/slices/playlistdataslice";
import { useEffect, type MouseEventHandler } from "react";
import { useAppDispatch } from "../../../hooks/hooks";
import { fetchPlaylistsSavedByAccountId } from "../../../stores/thunks/playlistthunks";
import PlaylistListItem from "./playlistlistitem";

export default function SideList({ handlePlaylistClick, handleCreatePlaylist }: {
    handlePlaylistClick: MouseEventHandler<HTMLButtonElement>;
    handleCreatePlaylist: MouseEventHandler<HTMLButtonElement>;
}) {
    const user = useSelector(selectCurrentUser);
    const playlists = useSelector(selectOwnPlaylists);
    const dispatch = useAppDispatch();

    //todo might need to be changed
    useEffect(() => {
        if (user.id)
            dispatch(fetchPlaylistsSavedByAccountId(user.id));
    }, [user])

    return (
        <ThemeProvider theme={darkTheme}>
            <Box>
                <Paper>
                    <div className="upper">
                        <Typography>Library</Typography>
                    </div>
                    <div>
                        <List>
                            {
                                playlists.map((p) => (
                                    <ListItem key={p.id}>
                                        <Button onClick={handlePlaylistClick}>
                                            <PlaylistListItem id={p.id}
                                                name={p.name} createdAt={p.createdAt}
                                                updatedAt={p.updatedAt} songs={p.songs} />
                                        </Button>
                                    </ListItem>
                                ))
                            }
                            <Button onClick={handleCreatePlaylist}>
                                Create Playlist
                            </Button>
                        </List>
                    </div>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}