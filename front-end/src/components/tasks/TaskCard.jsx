import {
  Clock,
  Circle,
  CheckCircle2,
  EllipsisVertical,
  Pause,
} from "lucide-react";
import { Button } from "../Button";

export function TaskCard({ task, onToggle }) {
  const done = task?.status === "DONE";

  return (
    <div className="task-card">
      <div className="task-row">
        <div className="task-left">
          <Button
            className="task-check p-0 border-0 bg-transparent"
            onClick={() => onToggle?.(task)}
          >
            {done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
          </Button>

          <div className="task-info">
            {task?.estimatedTime && (
              <div className="task-time">
                <Clock size={14} />
                {task.estimatedTime}
              </div>
            )}

            <div
              className="task-title"
              style={{
                textDecoration: done ? "line-through" : "none",
                opacity: done ? 0.6 : 1,
              }}
            >
              {task?.title}
            </div>
          </div>
        </div>

        <div className="task-actions">
          <Button className="task-play">
            <Pause size={18} />
          </Button>

          <Button className="task-menu p-0 bg-transparent border-0">
            <EllipsisVertical size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
