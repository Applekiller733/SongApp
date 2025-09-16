
//const API_URL = "PLACEHOLDER";

import { useAppDispatch, useUpdateCurrentUser } from "../../hooks/hooks";
import type { AuthenticateRequest, ForgotPasswordRequest, RegisterRequest, ResetPasswordRequest, UpdateUserRequest, User, VerifyEmailRequest } from "../../models/user";
import { updateCurrentUser } from "../slices/userdataslice";
import type { AppDispatch } from "../store";
import { getAppDispatch } from "../storedispatch";
import authHeader from "./apihelper";

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
    const url = `${API_URL}`;
    return fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json", ...authHeader(url) },
        credentials: 'include',
    })
    .then(response => response.json());
}

export function apifetchUser(id: number) {
    return "NOT IMPLEMENTED";
}

export function apifetchUserProfile(id: number) {
    const url = `${API_URL}/profile/${id}`;
    return fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then(response => response.json())
}

export function apigetprofilepicture(id: number){
    const url = `${API_URL}/profile/${id}/picture`;
    return fetch(url, {
        method: "GET"
    });
}

export function apiregister(request: RegisterRequest) {
    const url = `${API_URL}/register`
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request)
    })
}

export function apiverify(request: VerifyEmailRequest) {
    const url = `${API_URL}/verify-email`;
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request)
    })
}

export function apilogin(request: AuthenticateRequest) {
    const url = `${API_URL}/authenticate`
    return fetch(url, {
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
    const url = `${API_URL}/revoke-token`;
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader(url) },
        credentials: "include"
    });
    stopRefreshTokenTimer();
    // localStorage.removeItem('currentuser');
    deleteCurrentUserHelper();
}

export function apiforgotpassword(request: ForgotPasswordRequest) {
    const url = `${API_URL}/forgot-password`;
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
    })
}

export function apiresetpassword(request: ResetPasswordRequest) {
    const url = `${API_URL}/reset-password`;
    return fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
    })
}

//todo maybe refactor
export function apiupdateuser(request: UpdateUserRequest) {
    const url = `${API_URL}`;
    const formData = new FormData();
    var stringid = (request.id as unknown) as string;

    formData.append("Id", stringid);
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

    return fetch(url, {
        method: "PUT",
        headers: {
            ...authHeader(url),
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

export function apideleteuser(id: number) {
    const url = `${API_URL}/${id}`;
    return fetch(url, {
        method: "DELETE",
        headers: {"Content-Type": "application/json", ...authHeader(url)}
    })
}

function apirefreshToken() {
    const url = `${API_URL}/refresh-token`;
    return fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...authHeader(url)
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

//todo verify if token refresh timer works and fix if not
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

