import { apiRequest } from "./ApiService";

export const login = (credentials) => {
    return apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    });
}