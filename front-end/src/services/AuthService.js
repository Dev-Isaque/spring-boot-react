import { apiRequest } from "./apiService";

export const loginApi = (credentials) => {
    return apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    }
);
}