import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";

import { Button } from "../../../shared/components/Button";
import { useTaskItems } from "../hooks/useTaskItems";
import { TaskItemsList } from "../components/TaskItemsList";

export default function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const { items, loading, error, addItem, toggleDone, remove } =
    useTaskItems(taskId);

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
      <div className="task-details__header">
        <div className="task-details__header-left">
          <Button
            className="task-details__back"
            onClick={() => navigate(-1)}
            title="Voltar"
          >
            <ArrowLeft size={25} />
          </Button>

          <div>
            <h3 className="mb-1">Detalhes da Tarefa</h3>
            <div className="small text-muted">Checklist / Itens</div>
          </div>
        </div>
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
