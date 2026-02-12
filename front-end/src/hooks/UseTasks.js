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
        const created = await createTask(payload);
        setTasks((prev) => [created, ...prev]);
        return created;
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
