import "../../styles/auth.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="auth-page">

      <form className="auth-card">
        <h3>Entrar</h3>

        <input
          type="email"
          className="form-control auth-input"
          placeholder="Email"
        />

        <input
          type="password"
          className="form-control auth-input"
          placeholder="Senha"
        />

        <p>
          Esqueceu sua senha? <Link to="/reset">Redefinir</Link>
        </p>

        <p>
          Não tem conta? <Link to="/register">Cadastre-se aqui</Link>
        </p>

        <button className="auth-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
