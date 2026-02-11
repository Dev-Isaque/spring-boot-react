import { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";

function ProjectTasks({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!projectId) {
      setTasks([]);
      return;
    }

    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://localhost:8080/projects/${projectId}/tasks`,
          {
            credentials: "include",
            signal: controller.signal,
          },
        );

        if (!res.ok) throw new Error("Erro ao buscar tarefas do projeto");

        const data = await res.json();
        setTasks(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [projectId]);

  function handleToggle(task) {
    console.log("toggle", task);
  }

  if (!projectId) return <p>Selecione um projeto</p>;
  if (loading) return <p>Carregando tarefas do projeto...</p>;
  if (error) return <p className="auth-error">{error}</p>;
  if (!tasks.length) return <p>Nenhuma tarefa neste projeto</p>;

  return (
    <div className="task-list">
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} onToggle={handleToggle} />
      ))}
    </div>
  );
}

export default ProjectTasks;
