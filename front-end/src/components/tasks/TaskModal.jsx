import { Button } from "../Button";
import { Modal } from "../Modal";

export function TaskModal() {
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
          >
            Cancelar
          </Button>

          <Button type="button" className="btn btn-primary">
            Salvar
          </Button>
        </>
      }
    >
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Título da tarefa"
      />
      <textarea className="form-control" placeholder="Descrição" />
    </Modal>
  );
}
