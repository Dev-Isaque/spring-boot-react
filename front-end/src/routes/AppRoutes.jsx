import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Reset from "../pages/auth/Reset";

import Home from "../pages/app/Home";
import PersonalWorkspace from "../pages/app/PersonalWorkspace";
import Calendar from "../pages/app/Calendar";
import GroupWorkspace from "../pages/app/GroupWorkspace";

import PrivateRoute from "./PrivateRoute";
import { AppLayout } from "../components/layouts/AppLayout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />

        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/personal" element={<PersonalWorkspace />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/groups" element={<GroupWorkspace />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
