import { apiRequest } from "./apiService";

export const cadastrar = (user) => {
    return apiRequest("/users/cadastrar", {
        method: "POST",
        body: JSON.stringify(user),
    });
};
