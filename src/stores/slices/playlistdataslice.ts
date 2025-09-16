import { createSlice } from '@reduxjs/toolkit';
import type { Playlist } from '../../models/playlist';
import type { RootState } from '../store';
import { fetchPlaylists, fetchPlaylistsCreatedByAccountId, fetchPlaylistsSavedByAccountId } from '../thunks/playlistthunks';

const getInitialState = (): { playlists: Playlist[], savedplaylists: Playlist[], status: string, errormsg: string } => {

    return {
        playlists: [],
        savedplaylists: [],
        status: 'idle',
        errormsg: '',
    };
};


export const playlistdataSlice = createSlice(
    {
        name: 'playlistdata',
        initialState: getInitialState(),
        reducers: {
        },
        extraReducers(builder) {
            builder.addCase(fetchPlaylists.pending, (state) => {
                state.status = 'loading';
            })
                .addCase(fetchPlaylists.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    const loadedPlaylists = action.payload?.map((playlist: Playlist) => {
                        return playlist;
                    });
                    if (loadedPlaylists !== undefined) {
                        state.playlists = state.playlists.concat(loadedPlaylists);
                        // state.songs = loadedSongs;
                    }
                })
                .addCase(fetchPlaylists.rejected, (state, action) => {
                    state.status = 'failed';
                    state.errormsg = action.error.message || 'failed to load error';
                })
                .addCase(fetchPlaylistsSavedByAccountId.pending, (state) => {
                    state.status = 'loading';
                })
                .addCase(fetchPlaylistsSavedByAccountId.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    const loadedPlaylists = action.payload?.map((playlist: Playlist) => {
                        return playlist;
                    });
                    if (loadedPlaylists !== undefined) {
                        state.savedplaylists = state.savedplaylists.concat(loadedPlaylists);
                        // state.songs = loadedSongs;
                    }
                })
                .addCase(fetchPlaylistsSavedByAccountId.rejected, (state, action) => {
                    state.status = 'failed';
                    state.errormsg = action.error.message || 'failed to load error';
                })
        },
    }
);

export const selectAllPlaylists = (store: RootState) => store.playlistdata.playlists; // Can add further validation
export const selectOwnPlaylists = (store: RootState) => store.playlistdata.savedplaylists;
export const selectUsersStatus = (store: RootState) => store.playlistdata.status;
export const selectUsersError = (store: RootState) => store.playlistdata.errormsg;

// export const { updateUpvotes } = playlistdataSlice.actions;

export default playlistdataSlice.reducer;