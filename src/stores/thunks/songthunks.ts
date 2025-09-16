import { createAsyncThunk } from "@reduxjs/toolkit";
import type {Song, CreateSongRequest, DeleteSongRequest, FlipLikeRequest} from "../../models/song";
// import type CreateSongRequest from "../../models/song";
import { apicreatesong, apideletesong, apifetchsongbyid, apifetchsongs, apifliplike } from "../api/songapi";

export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
    try {
        const response:Song[] = await apifetchsongs();

        if (!response){
            throw new Error("Fetching Songs failed");
        }
        return response;
    }
    catch (err: any) {
        return err.message;
    }
});

export const fetchSongById = createAsyncThunk('songs/fetchSongById', async (id:number) => {
    try {
        const response:Song = await apifetchsongbyid(id);

        if (!response) {
            throw new Error("Fetching Song By Id failed");
        }

        return response;
    }
    catch (err:any){
        return err.message;
    }
})

export const createSong = createAsyncThunk('songs/createSong', async (request:CreateSongRequest) => {
    try{
        const response = await apicreatesong(request);
        
        if (!response)
        {
            throw new Error("Creating Song failed");
        }
        return response;
    }
    catch(err:any){
        return err.message;
    }
})

export const deleteSong = createAsyncThunk('songs/deleteSong', async (request: DeleteSongRequest) => {
    try {
        const response = apideletesong(request);
        
        if (!response){
            throw new Error("Deleting Song failed");
        }
        return response;
    }
    catch(err:any){
        return err.message;
    }
})

export const flipLike = createAsyncThunk('songs/flipLike', async (request: FlipLikeRequest) => {
    try{
        const response = await apifliplike(request);

        if (!response){
            throw new Error("Flipping Like failed");
        }
        return response;
    }
    catch(err:any){
        return err.message;
    }
})