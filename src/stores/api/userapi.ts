
//const API_URL = "PLACEHOLDER";

import type { RegisterRequest, VerifyEmailRequest } from "../../models/user";

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

export function apifetchUsersMocked() {
    return new Promise(resolve => setTimeout(() => { resolve(userdata) }, 500));
}

export function apifetchUsers() {
    //ADD AUTH?
    return fetch(`${API_URL}`, {
        method: "GET",
        headers: { "Content-Type": "application/json"},
    })
}

export function apifetchUser(id: number) {
    return "NOT IMPLEMENTED";
}

export function apiregister(request: RegisterRequest) {
    return fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request)
    })
}

export function apiverify(request: VerifyEmailRequest){
    return fetch(`${API_URL}/verify-email`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(request)
    })
}

export function apilogin(){
    return "NOT IMPLEMENTED";
}

