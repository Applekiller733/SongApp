import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreatePlaylistRequest, DeletePlaylistRequest, Playlist, UpdatePlaylistRequest } from "../../models/playlist";
import { apicreateplaylist, apideleteplaylist, apifetchplaylistbyid, apifetchplaylists,
     apifetchplaylistscreatedbyaccount, apifetchplaylistssavedbyaccount, apiupdateplaylist } from "../api/playlistapi";

export const fetchPlaylists = createAsyncThunk('playlists/fetchPlaylists', async () => {
    try {
        const response: Playlist[] = await apifetchplaylists();

        if (!response) {
            throw new Error("Fetching Playlists failed");
        }
        return response;
    }
    catch (err: any) {
        return err.message;
    }
})

export const fetchPlaylistById = createAsyncThunk('playlists/fetchPlaylistById', async (id: number) => {
    try {
        const response: Playlist = await apifetchplaylistbyid(id);

        if (!response) {
            throw new Error("Fetching Playlist by Id failed");
        }
        return response;
    }
    catch (err: any) {
        return err.message;
    }
})

export const fetchPlaylistsCreatedByAccountId = createAsyncThunk('playlists/fetchPlaylistsCreatedByAccountId',
     async (accountid: number) => {
    try {
        const response:Playlist[] = await apifetchplaylistscreatedbyaccount(accountid);

        if (!response){
            throw new Error("Fetching Playlists Created by Account Id failed");
        }
        return response;
    }
    catch(err:any){
        return err.message;
    }
})

export const fetchPlaylistsSavedByAccountId = createAsyncThunk('playlists/fetchPlaylistsSavedByAccountId',
    async (accountid: number) => {
   try {
       const response:Playlist[] = await apifetchplaylistssavedbyaccount(accountid);

       if (!response){
           throw new Error("Fetching Playlists Saved by Account Id failed");
       }
       return response;
   }
   catch(err:any){
       return err.message;
   }
})

//check if this type of implementation is fine?
//should only be called with self id
// export const fetchPlaylistsOwned = createAsyncThunk('playlists/fetchPlaylistsOwned', async (accountid: number) => {
//     try {
//         const response:Playlist[] = await apifetchplaylistscreatedbyaccount(accountid);

//         if (!response){
//             throw new Error("Fetching Owned Playlists failed");
//         }
//         return response;
//     }
//     catch(err:any){
//         return err.message;
//     }
// })

export const createPlaylist = createAsyncThunk('playlists/createPlaylist', async(request:CreatePlaylistRequest) => {
    try{
        const response = await apicreateplaylist(request);

        if (!response){
            throw new Error("Creating Playlist failed");
        }
        return response;
    }
    catch(err:any){
        return err.message;
    }
})

export const updatePlaylist = createAsyncThunk('playlists/updatePlaylist', async(request:UpdatePlaylistRequest) => {
    try{
        const response = await apiupdateplaylist(request);

        if (!response){
            throw new Error("Updating Playlist failed");
        }
        return response;
    }
    catch(err:any){
        return err.message;
    }
})

export const deletePlaylist = createAsyncThunk('playlists/deletePlaylist', async(request: DeletePlaylistRequest) => {
    try{
        const response = await apideleteplaylist(request);

        if (!response){
            throw new Error("Deleting Playlist failed");
        }
        return response;
    }
    catch(err:any){
        return err.message;
    }
})