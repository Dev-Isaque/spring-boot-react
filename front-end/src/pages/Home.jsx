import Formulario from "./Formulario";
import Tabela from "./Tabela";
import { useProdutos } from "../hooks/UseProdutos";

function Home() {
  const {
    produtos,
    produto,
    modoCadastro,
    selecionar,
    limpar,
    cadastrar,
    alterar,
    remover,
    aoDigitar,
  } = useProdutos();

  return (
    <div className="App">
      <Formulario
        botao={modoCadastro}
        obj={produto}
        eventoTeclado={aoDigitar}
        cadastrar={cadastrar}
        alterar={alterar}
        remover={remover}
        cancelar={limpar}
      />

      <Tabela vetor={produtos} selecionar={selecionar} />
    </div>
  );
}

export default Home;
