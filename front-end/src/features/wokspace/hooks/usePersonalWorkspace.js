import { useEffect, useState } from "react";
import { getPersonalWorkspace } from "../service/workspaceService";

export function usePersonalWorkspace() {
    const [workspace, setWorkspace] = useState(null);
    const [loadingWorkspace, setLoadingWorkspace] = useState(true);
    const [errorWorkspace, setErrorWorkspace] = useState("");

    useEffect(() => {
        let alive = true;

        async function load() {
            setErrorWorkspace("");
            if (alive) setLoadingWorkspace(true);

            try {
                const r = await getPersonalWorkspace();

                if (!alive) return;

                if (!r?.sucesso) {
                    setErrorWorkspace(r?.mensagem || "Não foi possível carregar o workspace pessoal");
                    return;
                }

                setWorkspace(r.dados);
            } finally {
                if (alive) setLoadingWorkspace(false);
            }
        }

        load();
        return () => {
            alive = false;
        };
    }, []);

    return { workspace, loadingWorkspace, errorWorkspace };
}