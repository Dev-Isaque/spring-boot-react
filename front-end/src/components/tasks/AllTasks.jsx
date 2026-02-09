import { useEffect, useState } from "react";

function AllTasks({ workspaceId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!workspaceId) return;

    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://localhost:8080/workspaces/${workspaceId}/tasks`,
          { credentials: "include" },
        );

        if (!res.ok) throw new Error("Erro ao buscar tarefas");

        const data = await res.json();
        if (mounted) setTasks(data);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, [workspaceId]);

  if (loading) return <p>Carregando tarefas...</p>;
  if (error) return <p className="auth-error">{error}</p>;
  if (!tasks.length) return <p>Nenhuma tarefa encontrada</p>;

  return (
    <div className="task-list">
      {tasks.map((t) => (
        <div key={t.id} className="task-card">
          <strong>{t.title}</strong>
          <div>{t.status}</div>
        </div>
      ))}
    </div>
  );
}

export default AllTasks;
