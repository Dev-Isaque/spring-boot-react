export function TaskSection({ title, count, children }) {
  return (
    <section className="task-section">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">{title}</h4>
        <span className="badge text-bg-info">{count} tarefas</span>
      </div>
      <div className="mt-3 d-flex flex-column gap-3">{children}</div>
    </section>
  );
}
