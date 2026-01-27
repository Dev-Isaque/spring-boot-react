import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userVazio } from "../models/User";
import { cadastrar as cadastrarApi } from "../services/UserService";

export function useUsuario() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(userVazio);

    const cadastrar = async () => {
        const retorno = await cadastrarApi(user);

        if (!retorno.sucesso) return retorno;

        setUsers((prev) => [...prev, retorno.dados]);
        navigate("/login");

        return retorno;
    };

    return {
        cadastrar,
        user,
        setUser
    };
}
