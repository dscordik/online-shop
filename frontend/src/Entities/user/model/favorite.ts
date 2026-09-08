import {Favorite, Product} from "../../product/model/types";
import {getAccessToken} from "./tokenStorage";

function extractErrorMessage(errorData: any): string {
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

export async function  addFavorite(product_id:number): Promise<Favorite> {
    const token = getAccessToken()
    const headers: Record<string, string> =  {'Content-Type':'application/json', }
    if (token) {
        headers['Authorization'] = 'Bearer ' + token
    } else{
        throw new Error('Пользователь не авторизован')
    }
    const res = await fetch('http://localhost:8000/api/favorites', {
        method:'POST',
        headers:headers,
        body: JSON.stringify({product_id})
    })
    if (!res.ok) {
        const errorData = await  res.json()
        throw new Error(extractErrorMessage(errorData))
    } else {
        return await res.json()
    }
}

export async function deleteFavorite(product_id:number): Promise<boolean> {
    const token = getAccessToken()
    const headers: Record<string, string> =  {'Content-Type':'application/json', }
    if (token) {
        headers['Authorization'] = 'Bearer ' + token
    } else{
        throw new Error('Пользователь не авторизован')
    }
    const res = await fetch(`http://localhost:8000/api/favorites/${product_id}`, {
        method: 'DELETE',
        headers: headers
    })
    if (!res.ok) {
        const errorData = await  res.json()
        throw new Error(extractErrorMessage(errorData))
    } else {
        return true
    }
}

export async function allFavorites(): Promise<Favorite[]> {
    const token = getAccessToken()
    const headers: Record<string, string> =  {'Content-Type':'application/json', }
    if (token) {
        headers['Authorization'] = 'Bearer ' + token
    } else{
        throw new Error('Пользователь не авторизован')
    }
    const res = await fetch('http://localhost:8000/api/favorites/me', {
        method:'GET',
        headers:headers
    })
    if (!res.ok) {
        const errorData = await res.json()
        throw new Error(extractErrorMessage(errorData))
    } else {
        return await res.json()
    }
}