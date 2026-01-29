import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Spinner } from "../../components/Spinner";
import { AuthLayout } from "../../components/layouts/AuthLayout";

import { useUsuario } from "../../hooks/UseUsuario";
import { useState } from "react";

function Reset() {
  return (
    <AuthLayout title="Recuperar Senha">
      <form>
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
      </form>
    </AuthLayout>
  );
}

export default Reset;
