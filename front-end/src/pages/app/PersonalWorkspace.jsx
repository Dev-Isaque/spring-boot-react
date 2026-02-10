import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "../../components/Button";
import { ProjectBar } from "../../components/projects/ProjectBar";
import { CreateProjectInline } from "../../components/projects/CreateProjectInline";
import { TaskModal } from "../../components/tasks/TaskModal";

import { useProjects } from "../../hooks/UseProject";
import { usePersonalWorkspace } from "../../hooks/UsePersonalWorkspace";
import { useMe } from "../../hooks/UseMe";
import { TaskBody } from "../../components/tasks/TaskBody";

function PersonalWorkspace() {
  const { usuario, errorMe } = useMe();

  const { workspace, loadingWorkspace, errorWorkspace } =
    usePersonalWorkspace();
  const workspaceId = workspace?.id;

  const {
    projects,
    projectSelecionado,
    setProjectSelecionado,
    loadingProjects,
    savingProject,
    errorProjects,
    addProject,
  } = useProjects({ workspaceId });

  const [isCreatingProject, setIsCreatingProject] = useState(false);

  function openCreateProject() {
    setIsCreatingProject(true);
  }

  function cancelCreateProject() {
    if (savingProject) return;
    setIsCreatingProject(false);
  }

  async function confirmCreateProject(name) {
    if (savingProject) return;

    const result = await addProject({ name });
    if (!result?.ok) return;

    setIsCreatingProject(false);
  }

  const erroTela = errorMe || errorWorkspace || errorProjects;

  return (
    <div className="tasks-page">
      <h1>Suas Tarefas{usuario ? `, ${usuario.name}` : ""}</h1>

      {erroTela && <p className="auth-error">{erroTela}</p>}

      <ProjectBar
        projects={projects}
        projectSelecionado={projectSelecionado}
        setProjectSelecionado={setProjectSelecionado}
        isCreatingProject={isCreatingProject}
        onOpenCreate={openCreateProject}
        loadingWorkspace={loadingWorkspace}
        workspaceId={workspaceId}
        loadingProjects={loadingProjects}
        savingProject={savingProject}
        createSlot={
          <CreateProjectInline
            savingProject={savingProject}
            onConfirm={confirmCreateProject}
            onCancel={cancelCreateProject}
          />
        }
      />

      <TaskBody
        workspaceId={workspaceId}
        projectId={projectSelecionado}
        loadingWorkspace={loadingWorkspace}
      />

      <Button
        type="button"
        className="floating-btn btn-color"
        data-bs-toggle="modal"
        data-bs-target="#modalTask"
        disabled={projectSelecionado === "ALL" || !projectSelecionado}
        title={
          projectSelecionado === "ALL"
            ? "Selecione um projeto para criar tarefa"
            : "Nova tarefa"
        }
      >
        <Plus /> Nova Tarefa
      </Button>

      <TaskModal projectId={projectSelecionado} />
    </div>
  );
}

export default PersonalWorkspace;
