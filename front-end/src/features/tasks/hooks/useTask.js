import { useEffect, useState } from "react";
import { getTaskById } from "../services/taskService";

export function useTask(taskId) {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!taskId) return;

        async function load() {
            try {
                setLoading(true);
                setError(null);

                const data = await getTaskById(taskId);
                setTask(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [taskId]);

    return { task, loading, error };
}
