import Logo from "../../assets/images/logo.png";
import { AlternateTheme } from "../AlternateTheme";
import "../../styles/auth.css";

export function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-theme-toggle">
          <AlternateTheme />
        </div>

        <div className="auth-header">
          <img src={Logo} alt="Logo" className="auth-logo" />
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>

        {children}
      </div>
    </div>
  );
}
