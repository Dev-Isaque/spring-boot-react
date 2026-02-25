import { ArrowLeft, ListCheck, FileText } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../../shared/components/Button";
import { TaskItemsList } from "../components/TaskItemsList";
import { TaskProgress } from "../components/TaskProgress";
import { TaskComment } from "../components/TaskComment";

import { useTask } from "../hooks/useTask";
import { useTaskItems } from "../hooks/useTaskItems";
import { useTaskProgress } from "../hooks/useTaskProgress";
import { TaskDescription } from "../components/TaskDescription";
import { TaskProperty } from "../components/Taskproperty";
import { TaskFiles } from "../components/TaskFiles";

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

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="container py-3 task-details">
      <div className="row">
        <div className="col-lg-8 col-xl-9">
          <div className="m-2">
            <Button
              className="task-details__back"
              onClick={() => navigate(-1)}
              title="Voltar"
            >
              <ArrowLeft size={18} />
              <span className="ms-1">Voltar</span>
            </Button>
          </div>
          <div className="task-details__header">
            <div className="task-hero">
              <div className="task-hero__content">
                <div className="task-hero__info">
                  <h1 className="task-hero__title">
                    {taskLoading ? "Carregando..." : task?.title}
                  </h1>

                  {task && (
                    <div className="task-hero__meta">
                      ID: {task.id?.slice(0, 6)} • Criado em{" "}
                      {formatDate(task.createdAt)}, Criado por {task?.name}
                    </div>
                  )}
                </div>

                <TaskProgress progress={progress} size="hero" showLabel />
              </div>
            </div>
          </div>

          <div className="p-2 mb-3">
            <div className="d-flex align-items-center gap-2 mb-4">
              <FileText />
              <span className="fw-semibold">Descrição</span>
            </div>
            <TaskDescription description={task?.description} />
          </div>

          <div className="p-2 mb-4">
            <div className="task-section-header">
              <div className="d-flex align-items-center gap-2">
                <ListCheck size={20} />
                <span className="fw-semibold">Sub-tarefas</span>
              </div>

              <span className="task-remaining-badge">
                {items.filter((i) => !i.done).length} Restantes
              </span>
            </div>

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

          <div className="p-2 mb-3">
            <TaskComment taskId={taskId} />
          </div>
        </div>

        <div className="col-lg-4 col-xl-3">
          <TaskProperty task={task} />

          <TaskFiles taskId={taskId} />

          <div className="d-flex align-items-center gap-2 mt-4 mb-3">
            <Button className="btn-color">Concluir Tarefa</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
