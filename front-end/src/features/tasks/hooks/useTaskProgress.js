import { useEffect, useState, useCallback } from "react";
import { getTaskProgress } from "../services/taskService";

export function useTaskProgress(taskId) {
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const load = useCallback(async () => {
        if (!taskId) return;

        try {
            setLoading(true);
            setError(null);

            const data = await getTaskProgress(taskId);
            setProgress(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [taskId]);

    useEffect(() => {
        load();
    }, [load]);

    return {
        progress,
        loading,
        error,
        reload: load,
    };
}
