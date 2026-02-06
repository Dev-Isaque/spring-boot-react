import { useEffect, useState } from "react";
import { getMyProjects, createProject } from "../services/projectService";

export function useProjects({ workspaceId }) {
    const [projects, setProjects] = useState([]);
    const [projectSelecionado, setProjectSelecionado] = useState("ALL");
    const [loadingProjects, setLoadingProjects] = useState(false);
    const [savingProject, setSavingProject] = useState(false);
    const [errorProjects, setErrorProjects] = useState("");

    async function loadProjects() {
        setLoadingProjects(true);
        setErrorProjects("");

        try {
            const r = await getMyProjects();

            if (!r?.sucesso) {
                setProjects([]);
                setErrorProjects(r?.mensagem || "Não foi possível carregar os projetos");
                return;
            }

            setProjects(Array.isArray(r.dados) ? r.dados : []);
        } finally {
            setLoadingProjects(false);
        }
    }

    async function addProject({ name, description = "" }) {
        setErrorProjects("");

        const cleanName = (name || "").trim();
        if (!cleanName) {
            setErrorProjects("Digite um nome para o projeto.");
            return { ok: false };
        }

        if (!workspaceId) {
            setErrorProjects("Workspace pessoal ainda não carregou.");
            return { ok: false };
        }

        setSavingProject(true);

        try {
            const r = await createProject({ workspaceId, name: cleanName, description });

            if (!r?.sucesso) {
                setErrorProjects(r?.mensagem || "Não foi possível criar o projeto");
                return { ok: false };
            }

            if (r?.dados?.id) {
                setProjects((prev) => [...prev, r.dados]);
                setProjectSelecionado(r.dados.id);
                return { ok: true, project: r.dados };
            }

            await loadProjects();
            return { ok: true };
        } finally {
            setSavingProject(false);
        }
    }

    useEffect(() => {
        if (!workspaceId) return;
        loadProjects();
    }, [workspaceId]);

    return {
        projects,
        projectSelecionado,
        setProjectSelecionado,
        loadingProjects,
        savingProject,
        errorProjects,
        addProject,
    };
}
