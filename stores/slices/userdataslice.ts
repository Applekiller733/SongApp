import { createSlice } from '@reduxjs/toolkit';
import type User from '../../models/user';
import type { RootState } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsersMocked } from '../api/userapi';

const getInitialState = (): { users: User[], currentuser: User, status: string, errormsg: string } => {

    return {
        users: [],
        currentuser: {id: '', username: '', password: ''}, // REPLACE CURRENT USER WITH A USER VIEWMODEL
        status: 'idle',
        errormsg: '',
    };
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    //TODO: replace with actual API call
    // 
    try {
        const response = await fetchUsersMocked() as User[];
        
        return response;
    }
    catch (err: any) {
        return err.message;
    }
});

export const fetchCurrentUser = createAsyncThunk('users/fetchCurrentUser', async () => {
    try {

    }
    catch (err: any){
        return err.message;
    }
})

export const userdataSlice = createSlice(
    {
        name: 'userdata',
        initialState: getInitialState(),
        reducers: {
            updateCurrentUser: (state, action) => {
                state.currentuser = action.payload;
            },
        },
        extraReducers(builder) {
            builder.addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
                .addCase(fetchUsers.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    const loadedUsers = action.payload?.map((user: User) => {
                        //in case i need to add any other ops here/remove fields etc idk
                        return user;
                    });
                    if (loadedUsers !== undefined)
                        state.users = state.users.concat(loadedUsers);
                })
                .addCase(fetchUsers.rejected, (state, action) => {
                    state.status = 'failed';
                    state.errormsg = action.error.message || 'failed to load error';
                })
        },
    }
);

export const selectAllUsers = (userdata: RootState) => userdata.userdata.users;
export const selectCurrentUser = (userdata: RootState) => userdata.userdata.currentuser;
export const selectUsersStatus = (userdata: RootState) => userdata.userdata.status;
export const selectUsersError = (userdata: RootState) => userdata.userdata.errormsg;

export const { updateCurrentUser } = userdataSlice.actions;

export default userdataSlice.reducer;