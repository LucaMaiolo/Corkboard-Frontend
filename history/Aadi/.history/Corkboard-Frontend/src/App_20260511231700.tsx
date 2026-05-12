import type { JSX } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./layouts/layout";
import { Home } from "./pages/Home";
import { AllTasksPage } from "./pages/AllTasksPage";
import { CreatePage } from "./pages/CreatePage";
import { LoginPage } from "./pages/LoginPage";
import { TaskDetailPage } from "./pages/TaskDetailPage";
import { UpdatePage } from "./pages/UpdatePage";
import "./App.css";

function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/all-tasks" element={<AllTasksPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="tasks/:id" element={<TaskDetailPage />} />
          <Route path="/update" element={<UpdatePage />} />

          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
