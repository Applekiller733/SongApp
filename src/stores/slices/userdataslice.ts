import { createSlice } from '@reduxjs/toolkit';
import type { RegisterRequest, User } from '../../models/user';
import type { RootState } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apifetchUsers, apiregister, apiverify } from '../api/userapi';
import type { VerifyEmailRequest } from '../../models/user';

const getInitialState = (): { users: User[], currentuser: User, status: string, errormsg: string } => {

    return {
        users: [],
        currentuser: { id: undefined, username: '', email: '' },
        status: 'idle',
        errormsg: '',
    };
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response: any = await apifetchUsers();
        if (!response.ok) {
            throw new Error("Fetch Users failed");
        }
        return await response.json();
    }
    catch (err: any) {
        return err.message;
    }
});

export const fetchCurrentUser = createAsyncThunk('users/fetchCurrentUser', async () => {
    try {
        //IMPLEMENT
    }
    catch (err: any) {
        return err.message;
    }
})

export const register = createAsyncThunk('users/register', async (request: RegisterRequest) => {
    try {
        const response = await apiregister(request);
        
        if (!response.ok){
            throw new Error("Registration Failed");
        }
        return await response.json();
    }
    catch (err: any) {
        return err.message;
    }
})

export const verify = createAsyncThunk('users/verify-email', async (request: VerifyEmailRequest) => {
    try{
        const response = await apiverify(request);

        if (!response.ok){
            throw new Error("Registration Failed");
        }
        return await response.json();
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
                console.log(state.currentuser);
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
                .addCase(register.fulfilled, (state) => {
                    state.status = 'succeeded';
                })
                .addCase(register.rejected, (state, action) => {
                    state.status = 'failed';
                    state.errormsg = action.error.message || 'failed to load error';
                })
                .addCase(verify.fulfilled, (state) => {
                    state.status = 'succeeded';
                })
                .addCase(verify.rejected, (state, action) => {
                    state.status = 'failed';
                    state.errormsg = action.error.message || 'failed to load error';
                })
        },
    }
);

export const selectAllUsers = (store: RootState) => store.userdata.users; // Can add further validation
export const selectCurrentUser = (store: RootState) => store.userdata.currentuser;
export const selectUsersStatus = (store: RootState) => store.userdata.status;
export const selectUsersError = (store: RootState) => store.userdata.errormsg;

export const { updateCurrentUser } = userdataSlice.actions;

export default userdataSlice.reducer;