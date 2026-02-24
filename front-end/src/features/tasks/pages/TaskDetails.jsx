import {
  ArrowLeft,
  CalendarDays,
  ListCheck,
  ClockFading,
  UserRound,
  TriangleAlert,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../../shared/components/Button";
import { TaskItemsList } from "../components/TaskItemsList";
import { TaskProgress } from "../components/TaskProgress";
import { TaskComment } from "../components/TaskComment";

import { useTask } from "../hooks/useTask";
import { useTaskItems } from "../hooks/useTaskItems";
import { useTaskProgress } from "../hooks/useTaskProgress";

export default function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const { items, loading, error, addItem, toggleDone, remove } =
    useTaskItems(taskId);

  const { task, loading: taskLoading } = useTask(taskId);

  const { progress, reload: reloadProgress } = useTaskProgress(taskId);

  const [newTitle, setNewTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const canAdd = useMemo(
    () => newTitle.trim().length > 0 && !saving,
    [newTitle, saving],
  );

  async function handleAdd() {
    if (!canAdd) return;
    try {
      setSaving(true);
      await addItem({ title: newTitle.trim() });
      setNewTitle("");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(item) {
    await toggleDone(item.id, !item.done);
    await reloadProgress();
  }

  return (
    <div className="container py-3 task-details">
      <div className="row">
        <div className="col-lg-8 col-xl-9">
          <div className="task-details__header d-flex align-items-start gap-3">
            <div className="task-hero flex-grow-1 p-4">
              <div className="d-flex justify-content-between align-items-center">
                <Button
                  className="task-details__back"
                  onClick={() => navigate(-1)}
                  title="Voltar"
                >
                  <ArrowLeft size={25} />
                </Button>
                <div>
                  <h2 className="fw-bold mb-2">
                    {taskLoading ? "Carregando..." : task?.title}
                  </h2>

                  {task && (
                    <div className="task-hero__meta">
                      ID: {task.id?.slice(0, 6)} • Criado em{" "}
                      {new Date(task.createdAt).toLocaleDateString()}, Criado
                      por {task?.created_by}
                    </div>
                  )}
                </div>

                <TaskProgress progress={progress} size="hero" showLabel />
              </div>
            </div>
          </div>

          <div className="task-section-header">
            <div className="d-flex align-items-center gap-2">
              <ListCheck size={20} />
              <span className="fw-semibold">Sub-tarefas</span>
            </div>

            <span className="task-remaining-badge">
              {items.filter((i) => !i.done).length} Restantes
            </span>
          </div>

          <div className="p-3 mb-3">
            {loading && <p>Carregando...</p>}
            {error && <p className="auth-error">{error}</p>}

            {!loading && !error && (
              <div className="task-details__card card p-3">
                <TaskItemsList
                  items={items}
                  onToggle={handleToggle}
                  onDelete={(itemId) => remove(itemId)}
                />
              </div>
            )}
            <div className="task-details__card p-4 d-flex gap-2 mt-4">
              <input
                className="form-control"
                placeholder="Novo item do checklist..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                disabled={saving}
              />

              <Button
                className="btn-color"
                onClick={handleAdd}
                title="Adicionar"
              >
                Adicionar
              </Button>
            </div>
          </div>

          <div className="p-3 mb-3">
            <TaskComment taskId={taskId} />
          </div>
        </div>

        <div className="col-lg-4 col-xl-3">
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
        </div>
      </div>
    </div>
  );
}
