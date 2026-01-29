import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Spinner } from "../../components/Spinner";
import { AuthLayout } from "../../components/layouts/AuthLayout";

import { useUsuario } from "../../hooks/UseUsuario";
import { useState } from "react";

export function Register() {
  const { cadastrar, user, setUser } = useUsuario();
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem("");

    if (!user?.email?.trim() || !user?.password?.trim()) {
      setMensagem("Preencha email e senha.");
      return;
    }

    setLoading(true);

    const r = await cadastrar();

    setTimeout(() => {
      setLoading(false);

      if (!r.sucesso) {
        setMensagem(r.mensagem);
      }

      alert("Usuário cadastrado com sucesso!");
    }, 800);
  }

  return (
    <AuthLayout title="Registre-se">
      <form onSubmit={handleSubmit}>
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

        <Button type="submit" className="auth-btn" disabled={loading}>
          {loading ? <Spinner /> : "Registrar"}
        </Button>

        {mensagem && <p className="auth-error">{mensagem}</p>}
      </form>
    </AuthLayout>
  );
}

export default Register;
