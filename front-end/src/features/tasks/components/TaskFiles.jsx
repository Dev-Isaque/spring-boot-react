import { Files } from "lucide-react";

export function TaskFiles({ taskId }) {
  return (
    <div className="task-properties-card mt-4 p-4">
      <div className="task-files">
        <h5 className="mb-3 fw-semibold d-flex align-items-center gap-2">
          <Files /> Arquivos
        </h5>
        <p>
          Em breve, você poderá adicionar arquivos relacionados a esta tarefa.
        </p>
      </div>
    </div>
  );
}
