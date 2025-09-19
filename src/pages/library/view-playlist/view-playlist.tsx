import { Box, Button, IconButton, Typography } from "@mui/material";
import SelectedSongsGrid from "../../../reusablecomponents/library/create-playlist-datagrids/selectedsongsdatagrid";
import type { Playlist } from "../../../models/playlist";
import { useAppDispatch } from "../../../hooks/hooks";
import { useEffect, useState } from "react";
import { deletePlaylist, fetchLoadedPlaylist, updatePlaylist } from "../../../stores/thunks/playlistthunks";
import PauseCircleFilled from "@mui/icons-material/PauseCircleFilled";
import PlayCircleFilled from "@mui/icons-material/PlayCircleFilled";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectLoadedPlaylist } from "../../../stores/slices/playlistdataslice";

export default function ViewPlaylist({ id, handleDeletePlaylist }: { id: string, handleDeletePlaylist:any }) {
    const dispatch = useAppDispatch();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    // const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const playlist = useSelector(selectLoadedPlaylist);
    const numid = (id as unknown) as number;

    useEffect(() => {
        dispatch(fetchLoadedPlaylist(numid));
    }, [])

    function handlePlay() {

    }

    async function handleRowSelect() {
        return "NOT IMPLEMENTED";
    }

    async function handleDeleteRow(songid: any) {
        if (playlist.songs.find(s => s.id === songid) != undefined) {
            const filteredsongs = playlist.songs.filter(s => s.id !== songid);
            const songIds = filteredsongs.map(s => s.id);
            const numplaylistid = (id as unknown) as number;

            const response = await dispatch(updatePlaylist({
                id: numplaylistid,
                name: playlist.name,
                songIds: songIds
            }))
        }
    }

    // async function handleDeletePlaylist() {
    //     const response = await dispatch(deletePlaylist({ id: numid }))
    //     if (response) {
    //         // setIsDeleted(true);
    //     }
    // }

    function handleFlipEditMode() {
        setIsEditing(!isEditing);
    }

    return (
        <Box>
            <Typography>{playlist.name}</Typography>
            <Typography>Created At: {playlist.createdAt}</Typography>
            <IconButton color="primary" size="medium" onClick={handlePlay}>
                <PlayCircleFilled style={{ fontSize: "50px" }}></PlayCircleFilled>
            </IconButton>
            {!isEditing && <Button onClick={handleFlipEditMode}>Edit</Button>}
            {isEditing && <Button onClick={handleFlipEditMode}>Stop Editing</Button>}
            <SelectedSongsGrid
                handleRowSelect={handleRowSelect}
                handleDeleteRow={handleDeleteRow}
                rows={playlist.songs}
                isEditing={isEditing}
            ></SelectedSongsGrid>
            {isEditing && <Button onClick={handleDeletePlaylist}>Delete Playlist</Button>}
            {/* {isDeleted && <Navigate to={'/library'}></Navigate>} */}
        </Box>
    );
}