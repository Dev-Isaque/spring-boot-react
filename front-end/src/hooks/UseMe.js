import { useEffect, useState } from "react";
import { getMe } from "../services/userService";

export function useMe() {
    const [usuario, setUsuario] = useState(null);
    const [loadingMe, setLoadingMe] = useState(false);
    const [errorMe, setErrorMe] = useState("");

    useEffect(() => {
        async function load() {
            setLoadingMe(true);
            setErrorMe("");

            const r = await getMe();
            if (!r?.sucesso) {
                setErrorMe(r?.mensagem || "Não foi possível carregar o usuário");
                setLoadingMe(false);
                return;
            }

            setUsuario(r.dados);
            setLoadingMe(false);
        }

        load();
    }, []);

    return { usuario, loadingMe, errorMe };
}
