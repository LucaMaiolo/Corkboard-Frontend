import type { JSX } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./layouts/layout";
import { Home } from "./pages/Home";
import {AllTasksPage} from "./pages/AllTasksPage";
import "./App.css";

function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/all-tasks" element={<AllTasksPage/>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
