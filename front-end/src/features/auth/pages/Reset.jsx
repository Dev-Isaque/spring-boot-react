import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { Spinner } from "../../../shared/components/Spinner";
import { AuthLayout } from "../../../app/layouts/AuthLayout";
import { Input } from "../../../shared/components/Input";

function Reset() {
  return (
    <AuthLayout title="Recuperar Senha">
      <form>
        <div className="auth-inputs">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Digite seu email"
          />

          <Input
            label="Senha"
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <Input
            label="Confirmar senha"
            type="password"
            name="password_confirm"
            placeholder="Confirme sua senha"
          />
        </div>

        <Button type="submit" className="btn-primary w-100 mt-3">
          Recuperar senha
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Reset;
