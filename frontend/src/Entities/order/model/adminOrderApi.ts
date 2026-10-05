import {OrderOut} from "../../product/model/types";
import {authorizedFetch} from "../../user/model/authApi";
import {API_BASE_URL} from "../../../Shared/api/config";
import {RegisterPayload} from "../../user/model/types";

export async function getAllOrders():Promise<OrderOut[]> {
    return authorizedFetch(`${API_BASE_URL}/api/order/all`, {method:'GET'})
}

export async function updateOrderStatus(orderId:number, newStatus:string):Promise<OrderOut> {
    return authorizedFetch(`${API_BASE_URL}/api/order/${orderId}`, {method:'PATCH', body: JSON.stringify({'status': newStatus})})
}