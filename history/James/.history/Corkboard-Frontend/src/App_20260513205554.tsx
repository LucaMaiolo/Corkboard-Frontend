import type { JSX } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/layout";
import { Home } from "./pages/Home";
import { AllTasksPage } from "./pages/AllTasksPage";
import { CreatePage } from "./pages/CreatePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { TaskDetailPage } from "./pages/TaskDetailPage";
import { UpdatePage } from "./pages/UpdatePage";
import { OffersPage } from "./pages/OffersPage";
import { MyOffersPage } from "./pages/MyOffersPage";
import { NotFoundPage } from "./pages/NotFoundPage";

import "./App.css";

function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/all-tasks" element={<AllTasksPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
          <Route path="/tasks/:id/update" element={<UpdatePage />} />
          <Route path="/update" element={<UpdatePage />} />
          <Route path="/offers/:gigId" element={<OffersPage />} />
          <Route path="/my-offers" element={<MyOffersPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
