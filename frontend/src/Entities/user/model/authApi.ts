import {AuthTokens, LoginPayload, RegisterPayload, User, UserUpdate} from "./types";
import {getAccessToken} from "./tokenStorage";

export function extractErrorMessage(errorData: any): string {
    const detail = errorData?.detail

    if (typeof detail === 'string') {
        return detail
    }

    if (Array.isArray(detail)) {
        return detail
            .map((item) => item?.msg ?? String(item))
            .join('; ')
    }

    return 'Произошла ошибка. Попробуйте ещё раз'
}

export async function authorizedFetch(url:string, param:Record<string, any>) {
    const token = getAccessToken()
    const headers: Record<string, string> =  {'Content-Type':'application/json', }
    if (token) {
        headers['Authorization'] = 'Bearer ' + token
    } else{
        throw new Error('Пользователь не авторизован')
    }
    const res = await fetch(url, {...param, headers:headers})
    if (!res.ok) {
        const errorData = await res.json()
        throw new Error(extractErrorMessage(errorData))
    } else {
        return await res.json()
    }
}

export async function registerUser(payload:RegisterPayload): Promise<User> {
    const res = await fetch('http://localhost:8000/api/auth/register', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })
    if (!res.ok) {
        const errorData = await res.json()
        throw new Error(extractErrorMessage(errorData))
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
        throw new Error(extractErrorMessage(errorData))
    } else {
        return await res.json()
    }
}

export async function fetchCurrentUser(): Promise<User>{
    return authorizedFetch('http://localhost:8000/api/auth/me', {method:'GET'})
}

export async function userUpdate(user:UserUpdate): Promise<User> {
    return authorizedFetch('http://localhost:8000/api/auth/me', {method:'PATCH', body:JSON.stringify(user)})
}