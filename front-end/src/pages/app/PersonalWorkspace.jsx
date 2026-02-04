import { useEffect, useState } from "react";
import { getMe } from "../../services/userService";
import { getMyProjects } from "../../services/projectService";

import { Plus } from "lucide-react";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";

function PersonalWorkspace() {
  const [usuario, setUsuario] = useState(null);
  const [mensagem, setMensagem] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectSelecionado, setProjectSelecionado] = useState("ALL"); // ALL ou UUID

  useEffect(() => {
    async function load() {
      setMensagem("");

      const rUser = await getMe();
      if (!rUser.sucesso) {
        setMensagem(rUser.mensagem || "Não foi possível carregar o usuário");
        return;
      }
      setUsuario(rUser.dados);

      const rProjects = await getMyProjects();
      if (!rProjects.sucesso) {
        setMensagem(
          rProjects.mensagem || "Não foi possível carregar os projetos",
        );
        setProjects([]); // garante array
        return;
      }

      setProjects(Array.isArray(rProjects.dados) ? rProjects.dados : []);
    }

    load();
  }, []);

  return (
    <div className="tasks-page">
      <h1>Suas Tarefas{usuario ? `, ${usuario.name}` : ""}</h1>

      {mensagem && <p className="auth-error">{mensagem}</p>}

      <div className="d-flex gap-2 flex-wrap">
        <Button
          type="button"
          className={
            projectSelecionado === "ALL" ? "btn-color" : "btn-outline-primary"
          }
          onClick={() => setProjectSelecionado("ALL")}
        >
          Todas
        </Button>

        {projects.map((p) => (
          <Button
            key={p.id}
            type="button"
            className={
              projectSelecionado === p.id
                ? "btn-color"
                : "btn-outline-primary"
            }
            onClick={() => setProjectSelecionado(p.id)}
          >
            {p.name}
          </Button>
        ))}
      </div>

      <Button
        type="button"
        className="floating-btn btn-color"
        data-bs-toggle="modal"
        data-bs-target="#modalTask"
      >
        <Plus /> Nova Tarefa Pessoal
      </Button>

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
    </div>
  );
}

export default PersonalWorkspace;
