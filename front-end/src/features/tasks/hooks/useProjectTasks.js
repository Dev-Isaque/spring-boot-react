import { useCallback, useEffect, useState } from "react";
import { listTasksByProject } from "../services/taskService";

export function useProjectTasks(projectId) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const load = useCallback(async () => {
        if (!projectId || projectId === "ALL") {
            setTasks([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const data = await listTasksByProject(projectId);
            setTasks(Array.isArray(data) ? data : []);
        } catch (e) {
            setError(e.message || "Erro ao buscar tarefas");
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        load();
    }, [load]);

    return { tasks, loading, error, reload: load, setTasks };
}
