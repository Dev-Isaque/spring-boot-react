import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userVazio } from "../models/User";
import { login as loginApi } from "../services/authService";

export function useAuth() {
    const navigate = useNavigate();

    const [user, setUser] = useState(userVazio);

    const login = async () => {
        const retorno = await loginApi(user);

        if (!retorno.sucesso) return retorno;

        navigate("/home");

        return retorno;
    };

    return {
        login,
        user,
        setUser,
    };
}
