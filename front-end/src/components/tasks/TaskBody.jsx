import AllTasks from "./AllTasks";
import ProjectTasks from "./ProjectTasks";

export function TaskBody({ workspaceId, projectId }) {
  if (!workspaceId) return <p>Carregando workspace...</p>;
  if (projectId === "ALL") return <AllTasks workspaceId={workspaceId} />;
  if (!projectId) return <p>Selecione um projeto</p>;

  return <ProjectTasks projectId={projectId} />;
}
