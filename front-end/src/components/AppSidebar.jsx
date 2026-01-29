import { NavLink } from "react-router-dom";
import { LayoutGrid, User, CalendarDays, Users, Settings } from "lucide-react";
import Logo from "../assets/images/logo.png";

export function AppSidebar() {
  const linkClass = ({ isActive }) =>
    `sidebar-link ${isActive ? "active" : ""}`;

  return (
    <aside className="app-sidebar d-flex flex-column">
      {/* Top */}
      <div className="sidebar-top d-flex align-items-center gap-2 px-3 py-3">
        {/* se preferir só texto, remova a img */}
        <img src={Logo} alt="FlowDesk" className="sidebar-logo" />
      </div>

      {/* Menu */}
      <nav className="sidebar-nav px-2">
        <NavLink to="/home" className={linkClass}>
          <LayoutGrid size={18} />
          <span>Início</span>
        </NavLink>

        <NavLink to="/personal" className={linkClass}>
          <User size={18} />
          <span>Pessoal</span>
        </NavLink>

        <NavLink to="/calendar" className={linkClass}>
          <CalendarDays size={18} />
          <span>Calendário</span>
        </NavLink>

        <NavLink to="/groups" className={linkClass}>
          <Users size={18} />
          <span>Grupos</span>
        </NavLink>

        <div className="sidebar-section px-2 mt-4 mb-2">
          ESPAÇOS DE TRABALHO
        </div>

        <button type="button" className="sidebar-chip">
          <span className="dot dot-purple" />
          Design System
        </button>

        <button type="button" className="sidebar-chip">
          <span className="dot dot-green" />
          Desenvolvimento
        </button>

        <button type="button" className="sidebar-chip">
          <span className="dot dot-yellow" />
          Marketing
        </button>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer mt-auto px-3 py-3">
        <NavLink to="/settings" className="sidebar-link">
          <Settings size={18} />
          <span>Configurações</span>
        </NavLink>

        <div className="sidebar-user mt-3 d-flex align-items-center gap-2">
          <div className="avatar">A</div>
          <div className="small">
            <div className="fw-semibold">Alex Silva</div>
            <div className="text-muted">alex@flowdesk.com.br</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
