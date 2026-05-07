import type { JSX } from "react";
import { useState } from "react";
import type { Task } from "./task";
import { AddTaskForm } from "./addTaskForm";
import { DisplayTask } from "./displayTask";

export function AddTask(): JSX.Element {
  const [added, setAdded] = useState<Task>();

  return (
    <>
      <AddTaskForm setAdded={setAdded} />

      <DisplayTask task={added} heading="Added Task" />
    </>
  );
}
