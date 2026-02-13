import { useCallback, useEffect, useState } from "react";
import { listTasksByWorkspace } from "../services/taskService";

export function useWorkspaceTasks(workspaceId) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const load = useCallback(async () => {
        if (!workspaceId) {
            setTasks([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const data = await listTasksByWorkspace(workspaceId);
            setTasks(data ?? []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [workspaceId]);

    useEffect(() => {
        load();
    }, [load]);

    return { tasks, loading, error, reload: load };
}