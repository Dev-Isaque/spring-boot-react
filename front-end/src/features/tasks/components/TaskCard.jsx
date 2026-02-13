import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Circle,
  Clock,
  EllipsisVertical,
  Pause,
  Play,
  RotateCcw,
  Square,
} from "lucide-react";
import { Button } from "../../../shared/components/Button";
import { useTaskTimer } from "../hooks/useTaskTimer";

export function TaskCard({ task, onToggle }) {
  const done = task?.status === "DONE";

  const timer = useTaskTimer(task?.estimatedTime);
  
  function handlePlayPause() {
    if (timer.isRunning) return timer.pause();
    if (timer.isPaused) return timer.resume();
    return timer.start();
  }

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
              <div
                className={`task-time ${timer.isRunning ? "is-running" : ""}`}
              >
                <Clock size={14} />
                {timer.timeText}
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
          <Button
            className="task-play"
            onClick={handlePlayPause}
            title="Iniciar/Pausar"
          >
            {timer.isRunning ? <Pause size={18} /> : <Play size={18} />}
          </Button>

          <Button
            className="task-menu p-0 bg-transparent border-0"
            onClick={timer.restart}
            title="Recomeçar"
          >
            <RotateCcw size={18} />
          </Button>

          <Button
            className="task-menu p-0 bg-transparent border-0"
            onClick={timer.stop}
            title="Parar"
          >
            <Square size={18} />
          </Button>

          <div className="dropstart">
            <Button
              className="task-menu p-0 bg-transparent border-0 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <EllipsisVertical size={18} />
            </Button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link to={`/tasks/${task.id}`} className="dropdown-item">
                  Exibir
                </Link>
              </li>
              <li>
                <button className="dropdown-item">Editar</button>
              </li>
              <li>
                <button className="dropdown-item text-danger">Excluir</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
