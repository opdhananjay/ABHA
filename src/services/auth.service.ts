import type { LoginForm } from "../types/login.types"
import apiClient from "./apiClient"

export const loginService = async (data:LoginForm) => {
    // Here i have used GET for simplicity, but in real application it should be POST with body
    const response  = await apiClient.get(`/login?username=${data.username}&password=${data.password}`);
    //const response  = await apiClient.post('/login',data);
    return response.data;
}



