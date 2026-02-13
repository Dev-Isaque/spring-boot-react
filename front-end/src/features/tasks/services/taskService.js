import { apiRequest } from "../../api/apiRequest";

export async function createTask(payload) {
    const res = await apiRequest("/tasks/register", {
        method: "POST",
        body: JSON.stringify(payload),
    });

    if (!res.sucesso) throw new Error(res.mensagem);
    return res.dados;
}

export async function listTasksByProject(projectId) {
    const res = await apiRequest(`/projects/${projectId}/tasks`);

    if (!res.sucesso) throw new Error(res.mensagem);
    return res.dados;
}

export async function listTasksByWorkspace(workspaceId) {
    const res = await apiRequest(`/workspaces/${workspaceId}/tasks`);

    if (!res.sucesso) throw new Error(res.mensagem);
    return res.dados;
}
