import { Box, Paper, Typography } from "@mui/material";
import "./playlistlistitem.css";
import type { Playlist } from "../../../models/playlist";

export default function PlaylistListItem(playlist:Playlist){


    return (
        <Box className="listitem-box">
            <Paper className="listitem-background">
                <Typography>{playlist.name} - {playlist.createdAt}</Typography>
            </Paper>
        </Box>
    );
}