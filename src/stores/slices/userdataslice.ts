import { createSlice } from '@reduxjs/toolkit';
import type { User, UserProfile } from '../../models/user';
import type { RootState } from '../store';
import { fetchUserProfile, fetchUsers, register, verify } from '../thunks/userthunks';

const getInitialState = (): { users: User[], currentuser: User, loadedProfile: UserProfile, status: string, errormsg: string } => {
    const users: User[] = [];
    const currentuser: User = { id: undefined, username: '', email: '', role: '', token: '' };
    const loadedProfile: UserProfile = {username: '', role: '', createdAt: '', updatedAt: ''};
    const status: string = 'idle';
    const errormsg: string = '';

    if (localStorage.getItem('currentuser') && typeof localStorage.getItem('currentuser') !== null) {
        //@ts-ignore
        var user = JSON.parse(localStorage.getItem('currentuser'));

        currentuser.id = user.id;
        currentuser.email = user.email;
        currentuser.username = user.userName;
        currentuser.role = user.role;
        currentuser.token = user.jwtToken;
    }

    return {
        users: users,
        currentuser: currentuser,
        loadedProfile: loadedProfile,
        status: status,
        errormsg: errormsg,
    };
};

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//     try {
//         const response: any = await apifetchUsers();
//         if (!response.ok) {
//             throw new Error("Fetch Users failed");
//         }
//         return await response.json();
//     }
//     catch (err: any) {
//         return err.message;
//     }
// });

// export const fetchCurrentUser = createAsyncThunk('users/fetchCurrentUser', async () => {
//     try {
//         //IMPLEMENT
//     }
//     catch (err: any) {
//         return err.message;
//     }
// })

// export const fetchUserProfile = createAsyncThunk('users/fetchUserProfile', async (id: number) => {
//     try {
//         const response = await apifetchUserProfile(id);

//         if (!response) {
//             throw new Error("Fetching User Profile Failed");
//         }
//         return response;
//     }
//     catch (err: any) {
//         return err.message;
//     }
// })

// export const fetchUserProfilePicture = createAsyncThunk('users/fetchUserProfilePicture', async (id: number) => {
//     try {
//         //todo implement
//     }
//     catch (err: any) {

//     }
// })

// export const register = createAsyncThunk('users/register', async (request: RegisterRequest) => {
//     try {
//         const response = await apiregister(request);

//         if (!response.ok) {
//             throw new Error("Registration Failed");
//         }
//         return await response.json();
//     }
//     catch (err: any) {
//         return err.message;
//     }
// })

// export const login = createAsyncThunk('users/login', async (request: AuthenticateRequest) => {
//     try {
//         const response = await apilogin(request);

//         // console.log(response);
//         if (!response) {
//             throw new Error("Authentication Failed");
//         }
//         return response;
//     }
//     catch (err: any) {
//         return err.message;
//     }
// })

// export const logout = createAsyncThunk('users/logout', async () => {
//     try {
//         apilogout();
//     }
//     catch (err: any) {
//         return err.message;
//     }
// })

// export const forgotpassword = createAsyncThunk('users/forgot-password', async (request: ForgotPasswordRequest) => {
//     try {
//         const response = await apiforgotpassword(request);

//         if (!response.ok) {
//             throw new Error("Forgot Password Failed");
//         }
//         return await response.json();
//     }
//     catch (err: any) {
//         return err.message;
//     }
// })

// export const resetpassword = createAsyncThunk('users/reset-password', async (request: ResetPasswordRequest) => {
//     try {
//         const response = await apiresetpassword(request);

//         if (!response.ok) {
//             throw new Error("Reset Password Failed");
//         }
//         return await response.json();
//     }
//     catch (err: any) {
//         return err.message;
//     }
// })

// //?: create separate slice for status management
// //e.g.: dispatch(manageStatus(response))
// export const verify = createAsyncThunk('users/verify-email', async (request: VerifyEmailRequest, thunkAPI) => {
//     try {
//         const response = await apiverify(request);

//         if (!response.ok) {
//             throw new Error("Registration Failed");
//         }
//         return await response.json();
//     }
//     catch (err: any) {
//         return err.message;
//     }
// })

export const userdataSlice = createSlice(
    {
        name: 'userdata',
        initialState: getInitialState(),
        reducers: {
            updateCurrentUser: (state, action) => {
                // if (action.payload.token && typeof action.payload.token !== undefined) {
                //     state.currentuser.token = action.payload.token;
                // }
                // state.currentuser.id = action.payload.id;
                // state.currentuser.username = action.payload.username;
                // state.currentuser.email = action.payload.email;
                // state.currentuser.role = action.payload.role;
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
                .addCase(fetchUserProfile.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    const profile = action.payload;
                    state.loadedProfile = {
                        username: profile.userName,
                        role: profile.role,
                        createdAt: profile.created,
                        updatedAt: profile.updated,
                    };
                })
                
        },
    }
);

export const selectAllUsers = (store: RootState) => store.userdata.users; // Can add further validation
export const selectCurrentUser = (store: RootState) => store.userdata.currentuser;
export const selectLoadedProfile = (store: RootState) => store.userdata.loadedProfile;
export const selectUsersStatus = (store: RootState) => store.userdata.status;
export const selectUsersError = (store: RootState) => store.userdata.errormsg;

export const { updateCurrentUser } = userdataSlice.actions;

export default userdataSlice.reducer;