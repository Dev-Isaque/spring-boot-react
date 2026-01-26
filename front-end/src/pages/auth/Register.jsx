import "../../styles/auth.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="auth-page">
      <form className="auth-card">
        <h3>Registre-se</h3>

        <input
          type="name"
          name="name"
          className="form-control auth-input"
          placeholder="Nome"
        />

        <input
          type="email"
          name="email"
          className="form-control auth-input"
          placeholder="Email"
        />

        <input
          type="password"
          name="password"
          className="form-control auth-input"
          placeholder="Senha"
        />

        <input
          type="password"
          name="password_confirm"
          className="form-control auth-input"
          placeholder="Confirme sua senha"
        />

        <p>
          Já tem conta? <Link to="/login">Entre aqui</Link>
        </p>

        <button className="auth-btn">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
