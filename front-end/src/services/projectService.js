import { apiRequest } from "./apiService";

export const getMyProjects = () => {
    return apiRequest("/projects", {
        method: "GET"
    });
};
