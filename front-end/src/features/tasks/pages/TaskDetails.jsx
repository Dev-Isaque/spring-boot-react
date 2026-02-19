import { ArrowLeft, Plus, ListCheck  } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../../shared/components/Button";
import { TaskItemsList } from "../components/TaskItemsList";
import { TaskProgress } from "../components/TaskProgress";

import { useTask } from "../hooks/useTask";
import { useTaskItems } from "../hooks/useTaskItems";

export default function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const { items, loading, error, addItem, toggleDone, remove } =
    useTaskItems(taskId);

  const { task, loading: taskLoading } = useTask(taskId);

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

  return (
    <div className="container py-3 task-details">
      <div className="task-details__header d-flex align-items-start gap-3">
        <Button
          className="task-details__back"
          onClick={() => navigate(-1)}
          title="Voltar"
        >
          <ArrowLeft size={25} />
        </Button>

        <div className="task-hero flex-grow-1 p-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-2">
                {taskLoading ? "Carregando..." : task?.title}
              </h2>

              {task && (
                <div className="task-hero__meta">
                  ID: {task.id?.slice(0, 6)} • Criado em{" "}
                  {new Date(task.createdAt).toLocaleDateString()}
                </div>
              )}
            </div>

            <TaskProgress taskId={taskId} size="hero" showLabel />
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

      <div className="task-details__card card p-3 mb-3">
        <div className="d-flex gap-2">
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
            disabled={!canAdd}
            title="Adicionar"
          >
            <Plus size={25} />
          </Button>
        </div>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="auth-error">{error}</p>}

      {!loading && !error && (
        <div className="task-details__card card p-3">
          <TaskItemsList
            items={items}
            onToggle={(item) => toggleDone(item.id, !item.done)}
            onDelete={(itemId) => remove(itemId)}
          />
        </div>
      )}
    </div>
  );
}
