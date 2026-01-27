import "../../styles/auth.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { AlternateTheme } from "../../components/AlternateTheme";

import { useUsuario } from "../../hooks/UseUsuario";
import { useState } from "react";

export function Register() {
  const { cadastrar, user, setUser } = useUsuario();
  const [mensagem, setMensagem] = useState("");

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const resposta = await cadastrar();

    if (!resposta.sucesso) {
      setMensagem(resposta.mensagem);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-theme-toggle">
          <AlternateTheme />
        </div>

        <div className="auth-header">
          <img src={Logo} alt="Logo" className="auth-logo" />
          <h3>Registre-se</h3>
        </div>

        <div className="auth-inputs">
          <div className="auth-field">
            <label>Nome</label>
            <input
              type="text"
              name="name"
              className="form-control auth-input"
              placeholder="Digite seu nome"
              value={user.name}
              onChange={handleChange}
            />
          </div>

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

          <div className="auth-field">
            <label>Confirmar senha</label>
            <input
              type="password"
              name="password_confirm"
              className="form-control auth-input"
              placeholder="Confirme sua senha"
              value={user.password_confirm}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="auth-footer">
          <p>
            Já tem conta? <Link to="/login">Entre aqui</Link>
          </p>
        </div>

        <button type="submit" className="auth-btn">
          Registrar
        </button>

        {mensagem && <p className="auth-error">{mensagem}</p>}
      </form>
    </div>
  );
}

export default Register;
