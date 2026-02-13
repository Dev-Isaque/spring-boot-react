import { useMemo, useState } from "react";
import { Button } from "../../../shared/components/Button";
import { Modal } from "../../../shared/components/Modal";
import { useTasks } from "../hooks/useTasks";

export function TaskModal({ projectId, labels = [] }) {
  const { addTask } = useTasks(projectId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");

  const [dueDateTime, setDueDateTime] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");

  const [selectedLabelIds, setSelectedLabelIds] = useState([]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const canSave = useMemo(() => {
    return projectId && projectId !== "ALL" && title.trim().length > 0;
  }, [projectId, title]);

  function toggleLabel(id) {
    setSelectedLabelIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  async function handleSave() {
    if (!canSave || saving) return;

    try {
      setSaving(true);
      setError(null);

      const payload = {
        projectId,
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDateTime: dueDateTime || null,
        estimatedTime: estimatedTime || null,
        labelIds: selectedLabelIds,
      };

      await addTask(payload);

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDateTime("");
      setEstimatedTime("");
      setSelectedLabelIds([]);

      const el = document.getElementById("modalTask");
      if (el && window.bootstrap) {
        window.bootstrap.Modal.getOrCreateInstance(el).hide();
      }
    } catch (e) {
      setError(e.message || "Erro inesperado");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      id="modalTask"
      title="Nova Tarefa"
      footer={
        <>
          <Button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            disabled={saving}
          >
            Cancelar
          </Button>

          <Button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!canSave || saving}
          >
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </>
      }
    >
      {projectId === "ALL" && (
        <p className="auth-error">Selecione um projeto para criar a tarefa.</p>
      )}
      {error && <p className="auth-error">{error}</p>}

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Título da tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={saving}
      />

      <textarea
        className="form-control mb-3"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={saving}
      />

      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <label className="form-label">Prioridade</label>
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={saving}
          >
            <option value="LOW">Baixa</option>
            <option value="MEDIUM">Média</option>
            <option value="HIGH">Alta</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Vencimento</label>
          <input
            type="datetime-local"
            className="form-control"
            value={dueDateTime}
            onChange={(e) => setDueDateTime(e.target.value)}
            disabled={saving}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Tempo (mm:ss)</label>
          <input
            type="text"
            className="form-control"
            placeholder="30:00"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            disabled={saving}
          />
        </div>
      </div>

      <div>
        <label className="form-label">Labels</label>

        {labels.length === 0 ? (
          <div className="small text-muted">Nenhuma label disponível.</div>
        ) : (
          <div className="d-flex flex-wrap gap-2">
            {labels.map((l) => (
              <button
                key={l.id}
                type="button"
                className={`btn btn-sm ${
                  selectedLabelIds.includes(l.id)
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => toggleLabel(l.id)}
                disabled={saving}
              >
                {l.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}
