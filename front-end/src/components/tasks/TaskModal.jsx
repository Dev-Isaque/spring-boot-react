import { useState } from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";

export function TaskModal({ projectId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const canSave = projectId && projectId !== "ALL" && title.trim().length > 0;

  async function handleSave() {
    if (!canSave || saving) return;

    try {
      setSaving(true);
      setError(null);

      // Se você usa Authorization Bearer, aqui precisa enviar o header.
      // Se você usa cookie (credentials include), pode manter assim.
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/tasks/cadastrar", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectId,
          title: title.trim(),
          description: description.trim(),
        }),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "Erro ao criar tarefa");
      }

      // limpa campos
      setTitle("");
      setDescription("");

      // fecha modal (Bootstrap 5)
      const el = document.getElementById("modalTask");
      if (el && window.bootstrap) {
        const instance = window.bootstrap.Modal.getOrCreateInstance(el);
        instance.hide();
      } else {
        // fallback: simula o dismiss
        document.querySelector(`#modalTask [data-bs-dismiss="modal"]`)?.click();
      }

      // ✅ aqui é onde você depois vai chamar um "reload" do TaskBody
      // (já te mostro abaixo como fazer)
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
        className="form-control"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={saving}
      />
    </Modal>
  );
}
