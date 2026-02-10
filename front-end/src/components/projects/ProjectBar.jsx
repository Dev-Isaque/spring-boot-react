import { Plus } from "lucide-react";
import { Button } from "../Button";

export function ProjectBar({
  projects = [],
  projectSelecionado,
  setProjectSelecionado,
  isCreatingProject,
  onOpenCreate,
  loadingWorkspace,
  workspaceId,
  loadingProjects,
  savingProject,
  createSlot,
}) {
  return (
    <div className="d-flex gap-2 flex-wrap align-items-center">
      <Button
        type="button"
        className={
          projectSelecionado === "ALL" ? "btn-color" : "btn-outline-primary"
        }
        onClick={() => setProjectSelecionado("ALL")}
        disabled={savingProject}
      >
        Todas
      </Button>

      {loadingProjects && (
        <span style={{ opacity: 0.7 }}>Carregando projetos...</span>
      )}

      {!loadingProjects &&
        projects.map((p) => (
          <Button
            key={p.id}
            type="button"
            className={
              projectSelecionado === p.id ? "btn-color" : "btn-outline-primary"
            }
            onClick={() => setProjectSelecionado(p.id)}
            disabled={savingProject || isCreatingProject}
          >
            {p.name}
          </Button>
        ))}

      {!isCreatingProject ? (
        <Button
          type="button"
          className="btn-color"
          onClick={onOpenCreate}
          disabled={
            loadingWorkspace || !workspaceId || loadingProjects || savingProject
          }
          title={!workspaceId ? "Carregando workspace..." : "Criar projeto"}
        >
          <Plus />
        </Button>
      ) : (
        createSlot
      )}
    </div>
  );
}
