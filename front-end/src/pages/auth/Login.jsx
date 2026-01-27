import "../../styles/auth.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { AlternateTheme } from "../../components/AlternateTheme";
import { useAuth } from "../../hooks/UseAuth";
import { useState } from "react";

function Login() {
  const { login, user, setUser } = useAuth();
  const [mensagem, setMensagem] = useState("");

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem("");

    const r = await login();

    if (!r.sucesso) {
      setMensagem(r.mensagem);
      return;
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-theme-toggle">
          <AlternateTheme />
        </div>

        <div className="auth-header">
          <img src={Logo} alt="Logo" className="auth-logo" />
          <h3>Bem-vindo de volta!</h3>
          <p>Faça login para continuar</p>
        </div>

        <div className="auth-inputs">
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control auth-input"
              placeholder="Digite seu email"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label>Senha</label>
            <input
              type="password"
              name="password"
              className="form-control auth-input"
              placeholder="Digite sua senha"
              value={user.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="auth-footer">
          <p>
            Esqueceu sua senha? <Link to="/reset">Redefinir</Link>
          </p>

          <p>
            Não tem conta? <Link to="/register">Cadastre-se aqui</Link>
          </p>
        </div>

        <button className="auth-btn">Login</button>
        {mensagem && <p className="auth-error">{mensagem}</p>}
      </form>
    </div>
  );
}

export default Login;
