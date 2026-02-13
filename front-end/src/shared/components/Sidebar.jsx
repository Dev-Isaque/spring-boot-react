import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  User,
  CalendarDays,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../features/auth/hooks/useAuth";
import Logo from "../assets/images/logo.png";

export function Sidebar({ onNavigate }) {
  const { logout } = useAuth();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const linkClass = ({ isActive }) =>
    `sidebar-link ${isActive ? "active" : ""}`;

  function handleNavigate() {
    if (onNavigate) onNavigate();
  }

  return (
    <aside className="app-sidebar d-flex flex-column">
      <div className="sidebar-top d-flex align-items-center gap-2 px-3 py-3">
        <img src={Logo} alt="FlowDesk" className="sidebar-logo" />
      </div>

      <nav className="sidebar-nav px-2">
        <NavLink to="/home" className={linkClass} onClick={handleNavigate}>
          <LayoutGrid size={18} />
          <span>Início</span>
        </NavLink>

        <NavLink to="/personal" className={linkClass} onClick={handleNavigate}>
          <User size={18} />
          <span>Pessoal</span>
        </NavLink>

        <NavLink to="/calendar" className={linkClass} onClick={handleNavigate}>
          <CalendarDays size={18} />
          <span>Calendário</span>
        </NavLink>

        <NavLink to="/groups" className={linkClass} onClick={handleNavigate}>
          <Users size={18} />
          <span>Grupos</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer mt-auto px-3 py-3">
        <NavLink
          to="/settings"
          className="sidebar-link"
          onClick={handleNavigate}
        >
          <Settings size={18} />
          <span>Configurações</span>
        </NavLink>

        <div className="sidebar-user mt-3 d-flex align-items-center gap-2">
          <div className="avatar">
            {usuario?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="small flex-grow-1">
            <div className="fw-semibold">{usuario?.name}</div>
            <div style={{ color: "var(--text-muted)" }}>{usuario?.email}</div>
          </div>

          <button
            className="btn btn-link text-danger p-0"
            onClick={logout}
            title="Sair"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
