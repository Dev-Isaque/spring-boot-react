import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { ProjectBar } from "../../features/projects/components/ProjectBar";
import { CreateProjectInline } from "../../features/projects/components/CreateProjectInline";

import { Button } from "../../shared/components/Button";
import { TaskModal } from "../../features/tasks/components/TaskModal";
import { TaskBody } from "../../features/tasks/components/TaskBody";

import { useProjects } from "../../features/projects/hooks/useProjects";
import { usePersonalWorkspace } from "../../features/wokspace/hooks/usePersonalWorkspace";
import { useMe } from "../../features/user/hooks/useMe";
import { useProjectTasks } from "../../features/tasks/hooks/useProjectTasks";

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

  const {
    tasks,
    loading: loadingTasks,
    error: errorTasks,
    setTasks,
  } = useProjectTasks(projectSelecionado);

  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const [labels, setLabels] = useState([]);
  const [loadingLabels, setLoadingLabels] = useState(false);
  const [errorLabels, setErrorLabels] = useState(null);

  useEffect(() => {
    if (!workspaceId) {
      setLabels([]);
      return;
    }

    const controller = new AbortController();

    async function loadLabels() {
      try {
        setLoadingLabels(true);
        setErrorLabels(null);

        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:8080/labels/workspace/${workspaceId}`,
          {
            credentials: "include",
            signal: controller.signal,
            headers: {
              Accept: "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          },
        );

        if (!res.ok) throw new Error("Erro ao buscar labels");

        const data = await res.json();
        setLabels(Array.isArray(data) ? data : []);
      } catch (e) {
        if (e.name !== "AbortError") setErrorLabels(e.message);
      } finally {
        setLoadingLabels(false);
      }
    }

    loadLabels();
    return () => controller.abort();
  }, [workspaceId]);

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

  function handleCreatedTask(newTask) {
    setTasks((prev) => [newTask, ...prev]);
  }

  const erroTela =
    errorMe || errorWorkspace || errorProjects || errorLabels || errorTasks;

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

      {loadingWorkspace ? (
        <div className="task-body-state">
          <p>Carregando workspace...</p>
        </div>
      ) : (
        <TaskBody
          workspaceId={workspaceId}
          projectId={projectSelecionado}
          loadingWorkspace={loadingWorkspace}
          tasks={tasks}
          loading={loadingTasks}
          error={errorTasks}
        />
      )}

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

      <TaskModal
        projectId={projectSelecionado}
        labels={labels}
        onCreated={handleCreatedTask}
        loadingLabels={loadingLabels}
      />
    </div>
  );
}

export default PersonalWorkspace;
