import { Outlet } from "react-router-dom";
import { AppSidebar } from "../AppSidebar";
import "../../styles/theme.css";
import "../../styles/tasks.css";
import "../../styles/sidebar.css";

export function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <AppSidebar />

      <main className="app-content">{children}</main>
    </div>
  );
}
