export function TaskCard({ task }) {
  return (
    <div className="task-card d-flex align-items-start gap-3">
      <input type="checkbox" checked={task.done} readOnly />
      <div className="flex-grow-1">
        <div className="fw-semibold">{task.title}</div>
        <div className="small text-muted">{task.time || ""}</div>
      </div>
      <PriorityBadge value={task.priority} />
    </div>
  );
}
