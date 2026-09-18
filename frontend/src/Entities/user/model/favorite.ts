import {Favorite} from "../../product/model/types";
import {authorizedFetch} from "./authApi";
import {API_BASE_URL} from "../../../Shared/api/config";

export async function  addFavorite(product_id:number): Promise<Favorite> {
    return authorizedFetch(`${API_BASE_URL}/api/favorites`, {method:'POST', body:JSON.stringify({product_id:product_id})})
}

export async function deleteFavorite(product_id:number): Promise<boolean> {
    return authorizedFetch(`${API_BASE_URL}/api/favorites/${product_id}`, {method: 'DELETE'})
}

export async function allFavorites(): Promise<Favorite[]> {
    return authorizedFetch(`${API_BASE_URL}/api/favorites/me`, {method:'GET'})
}