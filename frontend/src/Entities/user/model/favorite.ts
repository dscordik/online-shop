import {Favorite} from "../../product/model/types";
import {authorizedFetch} from "./authApi";

export async function  addFavorite(product_id:number): Promise<Favorite> {
    return authorizedFetch('http://localhost:8000/api/favorites', {method:'POST', body:JSON.stringify({product_id:product_id})})
}

export async function deleteFavorite(product_id:number): Promise<boolean> {
    return authorizedFetch(`http://localhost:8000/api/favorites/${product_id}`, {method: 'DELETE'})
}

export async function allFavorites(): Promise<Favorite[]> {
    return authorizedFetch('http://localhost:8000/api/favorites/me', {method:'GET'})
}