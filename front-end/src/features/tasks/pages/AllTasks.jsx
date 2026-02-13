import { useWorkspaceTasks } from "../hooks/useWorkspaceTasks";
import { TaskCard } from "../components/TaskCard";

function AllTasks({ workspaceId, onToggle }) {
  const { tasks, loading, error } = useWorkspaceTasks(workspaceId);

  if (loading) return <p>Carregando tarefas...</p>;
  if (error) return <p className="auth-error">{error}</p>;
  if (!tasks.length) return <p>Nenhuma tarefa encontrada</p>;

  return (
    <div className="task-list">
      {tasks.map((t) => (
        <TaskCard key={t.id} task={t} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default AllTasks;
