import { createAsyncThunk } from "@reduxjs/toolkit";
import type {Song, CreateSongRequest, DeleteSongRequest, FlipLikeRequest} from "../../models/song";
// import type CreateSongRequest from "../../models/song";
import { apicreatesong, apideletesong, apifetchsongbyid, apifetchsongs, apifliplike } from "../api/songapi";

export const fetchSongs = createAsyncThunk('songs/fetchSongs', async (_, thunkAPI) => {
    try {
        return await apifetchsongs();
    }
    catch (err: any) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const fetchSongById = createAsyncThunk('songs/fetchSongById', async (id:number, thunkAPI) => {
    try {
        return await apifetchsongbyid(id);
    }
    catch (err:any){
        return thunkAPI.rejectWithValue(err.message);
    }
})

export const createSong = createAsyncThunk('songs/createSong', async (request:CreateSongRequest, thunkAPI) => {
    try{
        return await apicreatesong(request);
    }
    catch(err:any){
        return thunkAPI.rejectWithValue(err.message);
    }
})

export const deleteSong = createAsyncThunk('songs/deleteSong', async (request: DeleteSongRequest, thunkAPI) => {
    try {
        return await apideletesong(request);
    }
    catch(err:any){
        return thunkAPI.rejectWithValue(err.message);
    }
})

export const flipLike = createAsyncThunk('songs/flipLike', async (request: FlipLikeRequest, thunkAPI) => {
    try{
        return await apifliplike(request);
    }
    catch(err:any){
        return thunkAPI.rejectWithValue(err.message);
    }
})