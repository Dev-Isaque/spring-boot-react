import { useMemo, useState } from "react";
import { Button } from "../../../shared/components/Button";
import { Modal } from "../../../shared/components/Modal";
import { Input } from "../../../shared/components/Input";
import { createTask } from "../services/taskService";

export function TaskModal({ projectId, onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const canSave = useMemo(() => {
    return (
      projectId && projectId !== "ALL" && title.trim().length > 0 && !saving
    );
  }, [projectId, title, saving]);

  async function handleSave() {
    if (!canSave) return;

    try {
      setSaving(true);
      setError(null);

      const payload = {
        projectId,
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDateTime: dueDate ? `${dueDate}T00:00:00` : null,
        estimatedTime: estimatedTime || null,
      };

      const created = await createTask(payload);

      if (onCreated) {
        onCreated(created);
      }

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDate("");
      setEstimatedTime("");

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
            disabled={!canSave}
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

      <Input
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={saving}
        className="mb-2"
      />

      <Input
        label="Descrição"
        as="textarea"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={saving}
        className="mb-2"
      />

      <div className="row mb-2">
        <div className="col">
          <Input
            label="Prioridade"
            as="select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={saving}
          >
            <option value="LOW">Baixa</option>
            <option value="MEDIUM">Média</option>
            <option value="HIGH">Alta</option>
          </Input>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Input
            label="Data de entrega"
            type="date"
            value={dueDate}
            min={today}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={saving}
          />
        </div>

        <div className="col-md-6">
          <Input
            label="Tempo estimado (mm:ss)"
            placeholder="30:00"
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            disabled={saving}
          />
        </div>
      </div>
    </Modal>
  );
}
