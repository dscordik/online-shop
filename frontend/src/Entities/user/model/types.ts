export interface User{
    id:number,
    email:string,
    is_active: boolean
}

export interface AuthTokens{
    access_token:string,
    refresh_token:string,
    token_type:string
}

export interface LoginPayload{
    email:string,
    password:string
}

export interface RegisterPayload{
    email:string,
    password:string
}