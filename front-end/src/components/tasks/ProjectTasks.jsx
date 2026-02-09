import { useEffect, useState } from "react";

function ProjectTasks({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectId) return;

    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://localhost:8080/projects/${projectId}/tasks`,
          { credentials: "include" },
        );

        if (!res.ok) throw new Error("Erro ao buscar tarefas do projeto");

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
  }, [projectId]);

  if (loading) return <p>Carregando tarefas do projeto...</p>;
  if (error) return <p className="auth-error">{error}</p>;
  if (!tasks.length) return <p>Nenhuma tarefa neste projeto</p>;

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

export default ProjectTasks;
