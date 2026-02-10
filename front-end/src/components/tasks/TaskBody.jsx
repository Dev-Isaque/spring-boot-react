import AllTasks from "./AllTasks";
import ProjectTasks from "./ProjectTasks";

export function TaskBody({ workspaceId, projectId, loadingWorkspace }) {
  if (loadingWorkspace) {
    return (
      <div className="task-body-state">
        <p>Carregando workspace...</p>
      </div>
    );
  }

  if (!workspaceId) {
    return (
      <div className="task-body-state">
        <p>Workspace não encontrado</p>
      </div>
    );
  }

  if (projectId === "ALL") {
    return <AllTasks workspaceId={workspaceId} />;
  }

  if (!projectId) {
    return (
      <div className="task-body-state">
        <p>Selecione um projeto</p>
      </div>
    );
  }

  return <ProjectTasks projectId={projectId} />;
}
