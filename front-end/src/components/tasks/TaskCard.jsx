import { PriorityBadge } from "./PriorityBadge";

export function TaskCard({ task, onToggle }) {
  const done = Boolean(task?.done);

  return (
    <div
      className={`task-card d-flex align-items-start gap-3 ${
        done ? "task-done" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={done}
        onChange={() => onToggle?.(task)}
        aria-label={`Marcar tarefa ${task?.title}`}
      />

      <div className="flex-grow-1">
        <div className="fw-semibold">{task?.title}</div>

        {task?.time && <div className="small text-muted">{task.time}</div>}
      </div>

      {task?.priority && <PriorityBadge value={task.priority} />}
    </div>
  );
}
