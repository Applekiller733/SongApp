
//const API_URL = "PLACEHOLDER";

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

export function fetchUsersMocked() {
    return new Promise(resolve => setTimeout(() => {resolve(userdata)}, 500));
}

export function fetchUsers() {
    return "NOT IMPLEMENTED";
}

export function fetchCurrentUser() {
    return "NOT IMPLEMENTED";
}