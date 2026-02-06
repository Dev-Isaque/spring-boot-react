import { useEffect, useState } from "react";
import { getPersonalWorkspace } from "../services/workspaceService";

export function usePersonalWorkspace() {
    const [workspace, setWorkspace] = useState(null);
    const [loadingWorkspace, setLoadingWorkspace] = useState(false);
    const [errorWorkspace, setErrorWorkspace] = useState("");

    useEffect(() => {
        async function load() {
            setLoadingWorkspace(true);
            setErrorWorkspace("");

            try {
                const r = await getPersonalWorkspace();

                if (!r?.sucesso) {
                    setErrorWorkspace(r?.mensagem || "Não foi possível carregar o workspace pessoal");
                    return;
                }
                setWorkspace(r.dados);
            } finally {
                setLoadingWorkspace(false);
            }
        }
        load();
    }, []);

    return { workspace, loadingWorkspace, errorWorkspace };
}
