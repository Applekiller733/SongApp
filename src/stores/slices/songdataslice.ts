import { createSlice } from '@reduxjs/toolkit';
import type Song from '../../models/song';
import type { RootState } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSongsMocked } from '../api/songapi';

const getInitialState = (): { songs: Song[], status: string, errormsg: string } => {

    return {
        songs: [],
        status: 'idle',
        errormsg: '',
    };
};

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

export const songdataSlice = createSlice(
    {
        name: 'songdata',
        initialState: getInitialState(),
        reducers: {
            updateUpvotes: (state, action) => {
                const song = state.songs.find(s => s.id === action.payload.id);
                if (song) {
                    song.upvotes = action.payload.upvotes;
                    console.log(song.upvotes);
                }
            }
        },
        extraReducers(builder) {
            builder.addCase(fetchSongs.pending, (state) => {
                state.status = 'loading';
            })
                .addCase(fetchSongs.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    const loadedSongs = action.payload?.map((song: Song) => {
                        return song;
                    });
                    if (loadedSongs !== undefined) {
                        state.songs = state.songs.concat(loadedSongs);
                        // state.songs = loadedSongs;
                    }
                })
                .addCase(fetchSongs.rejected, (state, action) => {
                    state.status = 'failed';
                    state.errormsg = action.error.message || 'failed to load error';
                })
        },
    }
);

export const selectAllSongs = (store: RootState) => store.songdata.songs; // Can add further validation
export const selectUsersStatus = (store: RootState) => store.songdata.status;
export const selectUsersError = (store: RootState) => store.songdata.errormsg;

export const { updateUpvotes } = songdataSlice.actions;

export default songdataSlice.reducer;