import { apiRequest } from "../../api/apiRequest";

export const loginApi = (credentials) => {
    return apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    }
    );
}