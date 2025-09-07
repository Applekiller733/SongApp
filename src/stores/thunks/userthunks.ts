import { createAsyncThunk } from "@reduxjs/toolkit";
import { apifetchUserProfile, apifetchUsers, apiforgotpassword, apigetprofilepicture, apilogin, apilogout, apiregister, apiresetpassword, apiupdateuser, apiverify } from "../api/userapi";
import type { AuthenticateRequest, ForgotPasswordRequest, RegisterRequest, ResetPasswordRequest, UpdateUserRequest, VerifyEmailRequest } from "../../models/user";
import type { AppDispatch } from "../store";


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

export const fetchUserProfile = createAsyncThunk('users/fetchUserProfile', async (id: number) => {
    try {
        const response = await apifetchUserProfile(id);

        if (!response) {
            throw new Error("Fetching User Profile Failed");
        }
        return response;
    }
    catch (err: any) {
        return err.message;
    }
})

export const getProfilePicture = createAsyncThunk('users/profile-picture', async (id: number) => {
    try{
        const response = await apigetprofilepicture(id);
        if (!response){
            throw new Error("Fetching Profile Picture Failed");
        }

        return await response.blob();
    }
    catch(err:any){
        return err.message;
    }
})

export const register = createAsyncThunk('users/register', async (request: RegisterRequest) => {
    try {
        const response = await apiregister(request);

        if (!response.ok) {
            throw new Error("Registration Failed");
        }
        return await response.json();
    }
    catch (err: any) {
        return err.message;
    }
})

export const login = createAsyncThunk('users/login', async (request: AuthenticateRequest, thunkAPI) => {
    try {
        const response = await apilogin(request);

        // console.log(response);
        if (!response) {
            throw new Error("Authentication Failed");
        }
        return response;
    }
    catch (err: any) {
        return err.message;
    }
})

export const logout = createAsyncThunk('users/logout', async (thunkAPI) => {
    try {
        apilogout();
    }
    catch (err: any) {
        return err.message;
    }
})

export const forgotpassword = createAsyncThunk('users/forgot-password', async (request: ForgotPasswordRequest) => {
    try {
        const response = await apiforgotpassword(request);

        if (!response.ok) {
            throw new Error("Forgot Password Failed");
        }
        return await response.json();
    }
    catch (err: any) {
        return err.message;
    }
})

export const resetpassword = createAsyncThunk('users/reset-password', async (request: ResetPasswordRequest) => {
    try {
        const response = await apiresetpassword(request);

        if (!response) {
            throw new Error("Reset Password Failed");
        }
        return await response.json();
    }
    catch (err: any) {
        return err.message;
    }
})

//?: create separate slice for status management
//e.g.: dispatch(manageStatus(response))
export const verify = createAsyncThunk('users/verify-email', async (request: VerifyEmailRequest) => {
    try {
        const response = await apiverify(request);

        if (!response) {
            throw new Error("Registration Failed");
        }
        return response;
    }
    catch (err: any) {
        return err.message;
    }
})

export const update = createAsyncThunk('users/update', async (request: UpdateUserRequest) => {
    try {

        const response = await apiupdateuser(request);

        if (!response) {
            throw new Error("Update Failed");
        }

        return response;
    }
    catch (err: any) {
        return err.message;
    }
})