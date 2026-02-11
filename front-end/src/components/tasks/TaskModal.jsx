import { useMemo, useState } from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";

export function TaskModal({ projectId, labels = [], onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");
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

      const token = localStorage.getItem("token");

      const payload = {
        projectId,
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate ? dueDate : null,
        labelIds: selectedLabelIds,
      };

      const res = await fetch("http://localhost:8080/tasks/cadastrar", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "Erro ao criar tarefa");
      }

      const created = await res.json().catch(() => null);

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDate("");
      setSelectedLabelIds([]);

      const el = document.getElementById("modalTask");
      if (el && window.bootstrap) {
        window.bootstrap.Modal.getOrCreateInstance(el).hide();
      } else {
        document.querySelector(`#modalTask [data-bs-dismiss="modal"]`)?.click();
      }

      if (created) onCreated?.(created);
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
        <div className="col-md-6">
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

        <div className="col-md-6">
          <label className="form-label">Vencimento</label>
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={saving}
          />
        </div>
      </div>

      <div>
        <label className="form-label">Labels</label>

        {labels.length === 0 ? (
          <div className="small text-muted">
            Nenhuma label disponível para este workspace/projeto.
          </div>
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
                title={l.name}
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
