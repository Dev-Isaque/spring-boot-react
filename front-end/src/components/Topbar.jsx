import { Search, Bell, Menu } from "lucide-react";

import { AlternateTheme } from "./AlternateTheme";

export function Topbar() {
  return (
    <nav className="navbar px-3 py-2 topbar">
      <span className="navbar-brand text-white fw-semibold">
        Tarefas Pessoais
      </span>

      <div className="d-flex align-items-center gap-2 ms-auto">
        <div className="input-group search-box">
          <span className="input-group-text bg-transparent border-0 text-muted">
            <Search size={16} />
          </span>
          <input
            type="text"
            className="form-control bg-transparent border-0 text-white"
            placeholder="Buscar tarefas..."
          />
        </div>

        <button className="icon-btn">
          <Bell size={18} />
        </button>

        <AlternateTheme />
      </div>
    </nav>
  );
}
