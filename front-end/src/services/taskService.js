import { apiRequest } from "./apiService";

export async function createTask(payload) {
    const response = await apiRequest("/tasks/register", {
        method: "POST",
        body: JSON.stringify(payload),
    });

    if (!response.sucesso) {
        throw new Error(response.mensagem);
    }

    return response.dados;
}

export async function listTasksByProject(projectId) {
    const response = await apiRequest(`/tasks/project/${projectId}`);

    if (!response.sucesso) {
        throw new Error(response.mensagem);
    }

    return response.dados;
}
