import { useEffect, useState, useCallback } from "react";
import { createTask, listTasksByProject } from "../services/taskService";

export function useTasks(projectId) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadTasks = useCallback(async () => {
        if (!projectId || projectId === "ALL") {
            setTasks([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const data = await listTasksByProject(projectId);
            setTasks(data ?? []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    async function addTask(payload) {
        try {
            setError(null);
            const created = await createTask(payload);
            setTasks((prev) => [created, ...prev]);
            return { ok: true, data: created };
        } catch (e) {
            setError(e.message);
            return { ok: false, error: e.message };
        }
    }

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    return {
        tasks,
        loading,
        error,
        reload: loadTasks,
        addTask,
    };
}