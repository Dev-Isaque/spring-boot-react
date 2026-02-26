import { useEffect, useState } from "react";
import { getWorkspaceTags } from "../service/workspaceService";

export function useWorkspaceTags(workspaceId) {

    const [tags, setTags] = useState([]);
    const [loadingTags, setLoadingTags] = useState(true);
    const [errorTags, setErrorTags] = useState("");

    useEffect(() => {
        let alive = true;

        async function load() {
            setErrorTags("");
            if (alive) setLoadingTags(true);

            try {
                const r = await getWorkspaceTags(workspaceId);

                if (!alive) return;

                if (!r?.sucesso) {
                    setErrorTags(r?.mensagem || "Não foi possível carregar as tags do workspace");
                    return;
                }

                setTags(r.dados);
            } finally {
                if (alive) setLoadingTags(false);
            }
        }


        load();
        return () => {
            alive = false;
        }
    }, [workspaceId]);

    return { tags, loadingTags, errorTags };
}