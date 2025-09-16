import authHeader from "./apihelper";
import type {Playlist, CreatePlaylistRequest, UpdatePlaylistRequest, DeletePlaylistRequest} from "../../models/playlist";

const API_URL = `${import.meta.env.VITE_API_URL}/playlists`;

export function apifetchplaylists(){
    const url = `${API_URL}`;
    return fetch(url, {
        method:"GET",
        headers: {"Content-Type":"application/json", ...authHeader(url)},
    })
    .then(response => response.json())
    // .then(response => {
    //     return response.map((p:any) => {
    //         const playlist:Playlist = {
    //             id: p.id,
    //             name: p.name,
    //             createdAt: p.createdAt,
    //             updatedAt: p.updatedAt,
    //             songs: p.songs,
    //         }
    //         return playlist;
    //     })
    // })
}

export function apifetchplaylistbyid(id:number){
    const url = `${API_URL}/${id}`;
    return fetch(url, {
        method: "GET",
        headers: {"Content-Type": "application/json", ...authHeader(url)},
        body: JSON.stringify(id),
    })
    .then(response => response.json())
    // .then(p => {
    //     const playlist:Playlist = {
    //         id: p.id,
    //         name: p.name,
    //         createdAt: p.createdAt,
    //         updatedAt: p.updatedAt,
    //         songs: p.songs,
    //     }
    //     return playlist;
    // })
}

export function apifetchplaylistscreatedbyaccount(accountid:number){
    const url = `${API_URL}/made-by/${accountid}`
    return fetch(url, {
        method: "GET",
        headers: {"Content-Type": "application/json", ...authHeader(url)},
        body: JSON.stringify(accountid),
    })
    .then (response => response.json())
    // .then (response => {
    //     return response.map((p:any) => {
    //         const playlist:Playlist = {
    //             id: p.id,
    //             name: p.name,
    //             createdAt: p.createdAt,
    //             updatedAt: p.updatedAt,
    //             songs: p.songs,
    //         }
    //         return playlist;
    //     })
    // })
}

export function apifetchplaylistssavedbyaccount(accountid:number){
    const url = `${API_URL}/saved-by/${accountid}`
    return fetch(url, {
        method: "GET",
        headers: {"Content-Type": "application/json", ...authHeader(url)},
        body: JSON.stringify(accountid),
    })
    .then(response => response.json())
}

export function apicreateplaylist(request: CreatePlaylistRequest) {
    const url = `${API_URL}/create-playlist`;
    return fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json", ...authHeader(url)},
        body: JSON.stringify(request),
    })
}

export function apiupdateplaylist(request: UpdatePlaylistRequest){
    const url = `${API_URL}`;
    return fetch(url, {
        method: "PUT",
        headers: {"Content-Type": "application/json", ...authHeader(url)},
        body: JSON.stringify(request),
    })
}

export function apideleteplaylist(request: DeletePlaylistRequest){
    const url = `${API_URL}`;
    return fetch(url, {
        method: "DELETE",
        headers: {"Content-Type": "application/json", ...authHeader(url)},
        body: JSON.stringify(request),
    })
}