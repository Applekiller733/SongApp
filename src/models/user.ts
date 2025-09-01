export interface User{
    id?: number,
    username: string,
    email:string
}

export interface RegisterRequest{
    username: string,
    email:string,
    password:string,
    confirmpassword:string,
    acceptterms: boolean
}

export interface VerifyEmailRequest {
    token: string,
}