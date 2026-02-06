import { apiRequest } from "./apiService";

export const getMyProjects = () => {
    return apiRequest("/projects", {
        method: "GET"
    });
};


export const createProject = ({ workspaceId, name, description = "" }) => {
    return apiRequest("/projects/create", {
        method: "POST",
        body: JSON.stringify({
            workspaceId,
            name,
            description,
        }),
    })
}