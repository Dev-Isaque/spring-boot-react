import { useCallback, useEffect, useState } from "react";
import { createComment, listComments } from "../services/commentService";

export function useComments(taskId) {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const load = useCallback(async () => {
        if (!taskId) {
            setComments([]);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const data = await listComments(taskId);
            setComments(data ?? []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [taskId]);

    async function addComment(payload) {
        try {
            setError(null);
            setError(null);

            const created = await createComment(taskId, payload);

            setComments(prev => [...prev, created]);

        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, [load]);

    return {
        comments,
        loading,
        error,
        addComment,
    };

}