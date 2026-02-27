import { apiRequest } from "../../api/apiRequest";

export const getPersonalWorkspace = () => {
    return apiRequest("/workspaces/personal", { method: "GET" });
};

export const getWorkspaceTags = (workspaceId) => {
    return apiRequest(`/workspace/${workspaceId}/tags`, { method: "GET" });
};

export const createWorkspaceTag = (workspaceId, tagName) => {
    return apiRequest(`/workspace/${workspaceId}/tags`, {
        method: "POST",
        body: JSON.stringify({ name: tagName }),
    });
}