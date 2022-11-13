import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import RegisterPage from "../pages/RegisterPage";
import Task from "../features/task/Task";
import Projects from "../features/project/Projects";
import TaskTeam from "../features/task/TaskTeam";
import Personnel from "../features/personnel/Personnel";
import Admin from "../features/admin/Admin";
import AccountPage from "../pages/AccountPage";
import ProjectProfilePage from "../features/project/ProjectProfilePage";



function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        {/* <Route index element={<HomePage />} /> */}
        <Route path="/Task" element={<Task />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Projects/:projectId" element={<ProjectProfilePage />} />
        <Route path="/TaskTeam" element={<TaskTeam />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Personnel" element={<Personnel />} />

        <Route path="account" element={<AccountPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
