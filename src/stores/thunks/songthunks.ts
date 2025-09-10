import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSongsMocked } from "../api/songapi";
import type Song from "../../models/song";

export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
    //TODO: replace with actual API call
    // 
    try {
        const response = await fetchSongsMocked() as Song[];

        return response;
    }
    catch (err: any) {
        return err.message;
    }
});