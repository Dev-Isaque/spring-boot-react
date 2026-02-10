import { apiRequest } from "./apiService";

export const getMyProjects = (workspaceId) => {
    return apiRequest(`/projects/workspace/${workspaceId}`, {
        method: "GET",
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