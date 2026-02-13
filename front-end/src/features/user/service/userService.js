import { apiRequest } from "../../api/apiRequest";

export const cadastrar = (user) => {
    return apiRequest("/users/register", {
        method: "POST",
        body: JSON.stringify(user),
    });
};

export const getMe = () => {
    const token = localStorage.getItem("token");

    return apiRequest("/users/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};