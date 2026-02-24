import { apiRequest } from "../../api/apiRequest";

export async function listComments(taskId) {
    const res = await apiRequest(`/task/${taskId}/comments/list-all`);
    if (!res.sucesso) throw new Error(res.mensagem);
    return res.dados;
}

export async function createComment(taskId, payload) {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await apiRequest(`/task/${taskId}/comments/create`, {
        method: "POST",
        body: JSON.stringify({
            ...payload,
            taskId,
            authorId: user.id,
        }),
    });

    if (!res.sucesso) throw new Error(res.mensagem);
    return res.dados;
}
