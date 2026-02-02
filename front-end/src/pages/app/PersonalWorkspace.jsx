import { TaskCard } from "../../components/tasks/TaskCard";
import { TaskSection } from "../../components/tasks/TaskSection";

function PersonalWorkspace() {
  const tasks = []; // vem do estado/api

  const sections = [
    { title: "Hoje", items: tasks.filter(/* ... */) },
    { title: "Próximos 7 dias", items: tasks.filter(/* ... */) },
    { title: "Sem data", items: tasks.filter(/* ... */) },
  ];

  return (
    <div className="tasks-page">
      <h1>Suas Tarefas</h1>

      {sections.map((s) => (
        <TaskSection key={s.title} title={s.title} count={s.items.length}>
          {s.items.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </TaskSection>
      ))}
    </div>
  );
}

export default PersonalWorkspace;
