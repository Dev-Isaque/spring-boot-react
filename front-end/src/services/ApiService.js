const API_URL = "http://localhost:8080";

export async function apiRequest(url, options = {}) {

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}${url}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options?.headers,
        },
        ...options,
    });

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        return {
            sucesso: false,
            mensagem: data?.mensagem || data?.message || "Erro na requisição",
        };
    }

    return {
        sucesso: true,
        dados: data,
    };
}
