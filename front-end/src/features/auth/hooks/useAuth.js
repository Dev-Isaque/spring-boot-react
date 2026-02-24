import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../service/authService";

const userVazio = {
    email: "",
    password: "",
};

export function useAuth() {
    const navigate = useNavigate();
    const [user, setUser] = useState(userVazio);

    const login = async () => {
        const retorno = await loginApi(user);

        if (!retorno.sucesso) {
            return retorno;
        }

        const { token, usuario } = retorno.dados;
        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(usuario));

        navigate("/home");
        return retorno;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");

        setUser(userVazio);

        navigate("/login");
    };

    return {
        login,
        logout,
        user,
        setUser,
    };
}