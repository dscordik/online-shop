import {authorizedFetch} from "../../user/model/authApi";
import {API_BASE_URL} from "../../../Shared/api/config";
import {Product, ProductCreate, ProductUpdate} from "./types";

export async function getAllProducts():Promise<Product[]> {
    return authorizedFetch(`${API_BASE_URL}/api/products`, {method:'GET'})
}
export async function createProduct(body: ProductCreate):Promise<Product>{
    return authorizedFetch(`${API_BASE_URL}/api/admin/products`, {method:'POST', body:JSON.stringify(body)})
}
export async function updateProduct(productId: number, body: ProductUpdate):Promise<Product>{
    return authorizedFetch(`${API_BASE_URL}/api/admin/products/${productId}`, {method:'PATCH', body:JSON.stringify(body)})
}
export async function deleteProduct(productId: number):Promise<{message:string}>{
    return authorizedFetch(`${API_BASE_URL}/api/admin/products/${productId}`, {method:'DELETE'})
}