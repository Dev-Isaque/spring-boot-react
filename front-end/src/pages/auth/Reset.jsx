import "../../styles/auth.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { AlternateTheme } from "../../components/AlternateTheme";

function Reset() {
  return (
    <div className="auth-page">
      <form className="auth-card">
        <div className="auth-theme-toggle">
          <AlternateTheme />
        </div>
        <div className="auth-header">
          <img src={Logo} alt="Logo" className="auth-logo" />
          <h3>Recuperar Senha</h3>
        </div>
        <div className="auth-inputs">
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-control auth-input"
              placeholder="Digite seu email"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-control auth-input"
              placeholder="Digite sua senha"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password_confirm">Confirmar senha</label>
            <input
              id="password_confirm"
              type="password"
              name="password_confirm"
              className="form-control auth-input"
              placeholder="Confirme sua senha"
            />
          </div>
        </div>
        <div className="auth-footer">
          <p>
            Fazer Login: <Link to="/login">Entre aqui</Link>
          </p>
        </div>
        <button className="auth-btn">Registrar</button>
      </form>
    </div>
  );
}

export default Reset;
