import { useEffect, useState, useCallback } from "react";
import {
    getWorkspaceTags,
    createWorkspaceTag,
} from "../service/workspaceService";

export function useWorkspaceTags(workspaceId) {
    const [tags, setTags] = useState([]);
    const [loadingTags, setLoadingTags] = useState(true);
    const [errorTags, setErrorTags] = useState("");
    const [creatingTag, setCreatingTag] = useState(false);

    const loadTags = useCallback(async () => {
        if (!workspaceId) return;

        setErrorTags("");
        setLoadingTags(true);

        try {
            const r = await getWorkspaceTags(workspaceId);

            if (!r?.sucesso) {
                setErrorTags(
                    r?.mensagem || "Não foi possível carregar as tags do workspace"
                );
                return;
            }

            setTags(r.dados || []);
        } catch (err) {

            console.error(err);
            setErrorTags("Erro inesperado ao carregar tags.");
        } finally {
            setLoadingTags(false);
        }
    }, [workspaceId]);

    const createTag = useCallback(
        async (tagName) => {
            if (!tagName?.trim()) return null;

            setCreatingTag(true);
            setErrorTags("");

            try {
                const r = await createWorkspaceTag(workspaceId, tagName.trim());

                if (!r?.sucesso) {
                    setErrorTags(r?.mensagem || "Não foi possível criar a tag.");
                    return null;
                }

                const newTag = r.dados;

                setTags((prev) => [...prev, newTag]);

                return newTag;
            } catch (err) {
                console.error(err);
                setErrorTags("Erro inesperado ao criar tag.");
                return null;
            } finally {
                setCreatingTag(false);
            }
        },
        [workspaceId]
    );

    useEffect(() => {
        if (!workspaceId) return;
        loadTags();
    }, [workspaceId, loadTags]);

    return {
        tags,
        loadingTags,
        errorTags,
        createTag,
        creatingTag,
        reloadTags: loadTags,
    };
}