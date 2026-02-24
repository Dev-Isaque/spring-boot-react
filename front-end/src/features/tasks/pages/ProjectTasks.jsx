import { useMemo, useState } from "react";
import { TaskCard } from "../components/TaskCard";

export default function ProjectTasks({ tasks = [], loading, error }) {
  const [activeTaskId, setActiveTaskId] = useState(null);

  const orderedTasks = useMemo(() => {
    const list = [...tasks];
    list.sort(
      (a, b) => Number(b.id === activeTaskId) - Number(a.id === activeTaskId),
    );
    return list;
  }, [tasks, activeTaskId]);

  function handleToggle(task) {
    console.log("toggle", task);
  }

  if (loading) return <p>Carregando tarefas...</p>;
  if (error) return <p className="auth-error">{error}</p>;
  if (!tasks.length) return <p>Nenhuma tarefa neste projeto</p>;

  return (
    <div className="task-list">
      {orderedTasks.map((t) => (
        <TaskCard
          key={t.id}
          task={t}
          onToggle={handleToggle}
          activeTaskId={activeTaskId}
          setActiveTaskId={setActiveTaskId}
        />
      ))}
    </div>
  );
}
