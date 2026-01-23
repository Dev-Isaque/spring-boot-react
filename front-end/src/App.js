import './styles/App.css';
import Formulario from './pages/Formulario';
import Tabela from './pages/Tabela';
import { useProdutos } from './hooks/UseProdutos';

function App() {

  const {
    produtos,
    produto,
    modoCadastro,
    selecionar,
    limpar,
    cadastrar,
    alterar,
    remover,
    aoDigitar
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

      <Tabela
        vetor={produtos}
        selecionar={selecionar}
      />
    </div>
  );
}

export default App;
