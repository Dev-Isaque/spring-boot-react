import {
  ClockFading,
  UserRound,
  TriangleAlert,
  CalendarDays,
} from "lucide-react";

export function TaskProperty({ task }) {
  return (
    <div className="task-properties-card p-4">
      <h6 className="task-properties-title mb-4">PROPRIEDADES</h6>

      <div className="task-property-item">
        <TriangleAlert size={18} />
        <div>
          <span className="label">Prioridade</span>
          <span className="value priority-badge">{task?.priority}</span>
        </div>
      </div>

      <div className="task-property-item">
        <ClockFading size={18} />
        <div>
          <span className="label">Status</span>
          <span className="value status-badge">{task?.status}</span>
        </div>
      </div>

      <div className="task-property-item">
        <UserRound size={18} />
        <div>
          <span className="label">Responsável</span>
          <span className="value">{task?.createdByName}</span>
        </div>
      </div>

      <div className="task-property-item">
        <CalendarDays size={18} />
        <div>
          <span className="label">Entrega</span>
          <span className="value">{task?.dueDateTime}</span>
        </div>
      </div>
    </div>
  );
}
