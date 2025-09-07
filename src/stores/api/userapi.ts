
//const API_URL = "PLACEHOLDER";

import { useAppDispatch, useUpdateCurrentUser } from "../../hooks/hooks";
import type { AuthenticateRequest, ForgotPasswordRequest, RegisterRequest, ResetPasswordRequest, UpdateUserRequest, User, VerifyEmailRequest } from "../../models/user";
import { updateCurrentUser } from "../slices/userdataslice";
import type { AppDispatch } from "../store";
import { getAppDispatch } from "../storedispatch";

const API_URL = `${import.meta.env.VITE_API_URL}/accounts`

const userdata = [
    {
        id: '1',
        username: 'test',
        password: 'testpass'
    },
    {
        id: '2',
        username: 'andrei',
        password: '123'
    }
]

// function updateCurrentUserHelper(user: User){
//     const updateCurrentUserHook = useUpdateCurrentUser();
//     updateCurrentUserHook(user);
// }

function updateCurrentUserHelper(user: User) {
    const dispatch = getAppDispatch();
    // console.log(user);
    if (localStorage.getItem('currentuser')) {
        var storageuser = JSON.parse(localStorage.getItem('currentuser') || "");
        //todo maybe reimplement a bit more nicely
        if (storageuser.id !== user.id) {
            storageuser.id = user.id;
        }
        if (storageuser.username !== user.username) {
            storageuser.username = user.username;
        }
        if (storageuser.role !== user.role) {
            storageuser.role = user.role;
        }
        if (storageuser.email !== user.email) {
            storageuser.email = user.email;
        }
        localStorage.setItem('currentuser', JSON.stringify(storageuser));
    }
    else {
        localStorage.setItem('currentuser', JSON.stringify(user));
    }
    dispatch(updateCurrentUser(user));
}

function deleteCurrentUserHelper() {
    const dispatch = getAppDispatch();
    localStorage.removeItem('currentuser');
    // console.log("Finished removing item from local storage");
    const emptyuser: User = {
        id: undefined,
        username: '',
        email: '',
        role: '',
        token: '',
    }
    dispatch(updateCurrentUser(emptyuser));
}

export function apifetchUsersMocked() {
    return new Promise(resolve => setTimeout(() => { resolve(userdata) }, 500));
}

export function apifetchUsers() {
    //check if works
    return fetch(`${API_URL}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", ...authHeader(`${API_URL}/refresh-token`) },
    })
}

export function apifetchUser(id: number) {
    return "NOT IMPLEMENTED";
}

export function apifetchUserProfile(id: number) {
    return fetch(`${API_URL}/profile/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json())
}

export function apigetprofilepicture(id: number){
    return fetch(`${API_URL}/profile/${id}/picture`, {
        method: "GET"
    });
}

export function apiregister(request: RegisterRequest) {
    return fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request)
    })
}

export function apiverify(request: VerifyEmailRequest) {
    return fetch(`${API_URL}/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request)
    })
}

export function apilogin(request: AuthenticateRequest) {
    return fetch(`${API_URL}/authenticate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
        credentials: "include",
    })
        .then(response => response.json())
        .then(user => {
            // publish user and start timer to refresh token
            // console.log(user);
            // localStorage.setItem('currentuser', JSON.stringify(user));
            const usermodel: User = {
                id: user.id,
                username: user.userName,
                email: user.email,
                role: user.role,
                token: user.jwtToken
            }
            // console.log(usermodel);
            updateCurrentUserHelper(usermodel);
            startRefreshTokenTimer();
            return user;
        });
}

export function apilogout() {
    // revoke token, stop refresh timer, remove from local storage
    fetch(`${API_URL}/revoke-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader(`${API_URL}/revoke-token`) },
        credentials: "include"
    });
    stopRefreshTokenTimer();
    // localStorage.removeItem('currentuser');
    deleteCurrentUserHelper();
}

export function apiforgotpassword(request: ForgotPasswordRequest) {
    return fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
    })
}

export function apiresetpassword(request: ResetPasswordRequest) {
    return fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
    })
}

export function apiupdateuser(request: UpdateUserRequest) {
    const formData = new FormData();

    if (request.username) formData.append("UserName", request.username);
    if (request.email) formData.append("Email", request.email);
    if (request.password) formData.append("Password", request.password);
    if (request.confirmpassword) formData.append("ConfirmPassword", request.confirmpassword);
    if (request.role) formData.append("Role", request.role);

    if (request.profilepicture && request.profilepicture.file) {
        formData.append("ProfilePicture.FileName", request.profilepicture.filename);
        formData.append("ProfilePicture.Extension", request.profilepicture.extension);
        formData.append("ProfilePicture.FormFile", request.profilepicture.file);
    }

    return fetch(`${API_URL}/${request.id}`, {
        method: "PUT",
        headers: {
            ...authHeader(`${API_URL}/${request.id}`),
        },
        body: formData,
    })
        .then(response => response.json())
        .then(user => {
            const usermodel: User = {
                id: user.id,
                username: user.userName,
                email: user.email,
                role: user.role,
                token: user.jwtToken
            }
            updateCurrentUserHelper(usermodel);
            // startRefreshTokenTimer();
            return user;
        });
}


function apirefreshToken() {
    return fetch(`${API_URL}/refresh-token`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...authHeader(`${API_URL}/refresh-token`)
        },
        credentials: "include"
    })
        .then(response => response.json())
        .then(user => {
            if (user === undefined || user === null) {
                throw Error("Invalid user");
            }
            localStorage.setItem('currentuser', JSON.stringify(user));
            startRefreshTokenTimer();

            // TODO: FIX UPDATING THE USER WHEN TOKEN REFRESHES!!!!!!!!


            const usermodel: User = {
                id: user.id,
                username: user.userName,
                email: user.email,
                role: user.role,
                token: user.jwtToken
            }
            updateCurrentUserHelper(usermodel);
            return user;
        })
        .catch((err) => {
            return err;
        });

}

let refreshTokenTimeout: any;

function startRefreshTokenTimer() {
    console.log("START OF REFRESH TOKEN TIMER");
    console.log(localStorage.getItem('currentuser'));
    if (localStorage.getItem('currentuser')) {
        //@ts-ignore
        const user = JSON.parse(localStorage.getItem('currentuser'));

        console.log("INSIDE REFRESH TOKEN TIMER");

        const jwtToken = JSON.parse(atob(user.jwtToken.split('.')[1]));

        // console.log(jwtToken);
        // set a timeout to refresh the token a minute before it expires
        // console.log(jwtToken.exp);
        const expires = new Date(jwtToken.exp * 1000);
        // const timeout = expires.getTime() - Date.now() - (60 * 1000);
        const timeout = 5;
        // console.log(timeout);
        const trials = 3;
        refreshTokenTimeout = setTimeout(apirefreshToken, timeout);
        // refreshTokenTimeout = setTimeout(() => { refreshTokenTrials(trials) }, timeout);
    }
}

// async function refreshTokenTrials(trials: number) {
//     const timeout = 5 * 1000;
//     const response = await apirefreshToken();
//     if (typeof response === typeof Error || response === undefined || response === null && (trials > 0)) {
//         setTimeout(() => { refreshTokenTrials(trials - 1) }, timeout)
//     }
//     else {
//         startRefreshTokenTimer();
//     }
// }

function stopRefreshTokenTimer() {
    clearTimeout(refreshTokenTimeout);
}

function authHeader(url: any) {
    // return auth header with jwt if user is logged in and request is to the api url
    //@ts-ignore
    const user = JSON.parse(localStorage.getItem('currentuser'));
    console.log(user);
    const isLoggedIn = user !== undefined && user.jwtToken !== null;
    const isApiUrl = url.startsWith(API_URL);
    console.log(isLoggedIn);
    console.log(isApiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return ''
    };
}
