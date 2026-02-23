import { apiRequest } from "../../api/apiRequest";

export async function createComment(taskId, payload) {
    const res = await apiRequest(`/comments/create`, {
        method: "POST",
        body: JSON.stringify({ ...payload, taskId }),
    });
    if (!res.sucesso) throw new Error(res.mensagem);
    return res.dados;
}