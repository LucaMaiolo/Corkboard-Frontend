import type { JSX } from "react";
import { TaskDetail } from "../components/TaskDetail";
export function TaskDetailPage(): JSX.Element {
  return (
    <>
      <h1> Task Detail</h1>
      <TaskDetail />
    </>
  );
}
