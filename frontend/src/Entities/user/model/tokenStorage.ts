import {AuthTokens} from "./types";

export function saveTokens(tokens:AuthTokens) {
    localStorage.setItem('access_token', tokens.access_token)
    localStorage.setItem('refresh_token', tokens.refresh_token)
}
export function getAccessToken() {
    const access_token = localStorage.getItem('access_token')
    return access_token
}
export function getRefreshToken() {
    const refresh_token = localStorage.getItem('refresh_token')
    return refresh_token
}
export function clearTokens() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}