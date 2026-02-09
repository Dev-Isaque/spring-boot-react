import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "../Button";
import { Input } from "../Input";

export function CreateProjectInline({ savingProject, onConfirm, onCancel }) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus?.();
  }, []);

  async function confirm() {
    if (savingProject) return;
    const clean = name.trim();
    if (!clean) return;
    await onConfirm(clean);
    setName("");
  }

  function cancel() {
    if (savingProject) return;
    setName("");
    onCancel?.();
  }

  return (
    <div className="d-flex gap-2 align-items-center">
      <Input
        ref={inputRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite aqui seu novo Projeto"
        disabled={savingProject}
        onKeyDown={(e) => {
          if (savingProject) return;
          if (e.key === "Enter") confirm();
          if (e.key === "Escape") cancel();
        }}
      />

      <Button
        type="button"
        className="btn-color"
        onClick={confirm}
        disabled={savingProject}
      >
        <Check />
      </Button>

      <Button
        type="button"
        className="btn-outline-primary"
        onClick={cancel}
        disabled={savingProject}
      >
        <X />
      </Button>
    </div>
  );
}
