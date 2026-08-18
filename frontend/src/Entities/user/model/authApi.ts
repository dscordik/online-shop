import {AuthTokens, LoginPayload, RegisterPayload, User, UserUpdate} from "./types";
import {getAccessToken} from "./tokenStorage";

export async function registerUser(payload:RegisterPayload): Promise<User> {
    const res = await fetch('http://localhost:8000/api/auth/register', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.detail)
    } else {
        return await res.json()
    }
}

export async function loginUser(payload: LoginPayload): Promise<AuthTokens> {
    const res = await fetch('http://localhost:8000/api/auth/login', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.detail)
    } else {
        return await res.json()
    }
}

export async function fetchCurrentUser(): Promise<User>{
    const token = getAccessToken()
    if (token == null){
        throw new Error('Пользователь не авторизован')
    }
    const res = await fetch('http://localhost:8000/api/auth/me', {
        method:'GET',
        headers: {'Authorization': 'Bearer ' + token}
    })
    if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.detail)
    } else {
        return await res.json()
    }
}

export async function userUpdate(user:UserUpdate): Promise<User> {
    const token = getAccessToken()
    if (token == null) {
        throw Error('Пользователь не авторизован')
    }
    const res = await fetch('http://localhost:8000/api/auth/me', {
        method:'PATCH',
        headers:{'Content-Type':'application/json', 'Authorization': 'Bearer ' + token},
        body:JSON.stringify(user)
    })
    if (!res.ok) {
        const errorData = await res.json()
        throw Error(errorData.detail)
    } else {
        return await res.json()
    }
}