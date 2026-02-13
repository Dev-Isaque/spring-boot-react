import { apiRequest } from "../../api/apiRequest";

export async function listTaskItems(taskId) {
    const res = await apiRequest(`/tasks/${taskId}/items`);
    if (!res.sucesso) throw new Error(res.mensagem);
    return res.dados;
}

export async function createTaskItem(taskId, payload) {
    const res = await apiRequest(`/tasks/${taskId}/items`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    if (!res.sucesso) throw new Error(res.mensagem);
    return res.dados;
}

export async function setTaskItemDone(itemId, done) {
    const res = await apiRequest(`/task-items/${itemId}/done`, {
        method: "PATCH",
        body: JSON.stringify({ done }),
    });
    if (!res.sucesso) throw new Error(res.mensagem);
    return res.dados;
}

export async function deleteTaskItem(itemId) {
    const res = await apiRequest(`/task-items/${itemId}`, {
        method: "DELETE",
    });
    if (!res.sucesso) throw new Error(res.mensagem);
    return true;
}
