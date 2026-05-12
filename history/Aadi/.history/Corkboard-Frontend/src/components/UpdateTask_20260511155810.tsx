import type { JSX } from "react";
import { useState } from "react";
import { UpdateTaskForm } from "./UpdateTaskForm";
import type { Task } from "./Task";
import { DisplayTask } from "./displayTask";

export function UpdateTask(): JSX.Element {
  const [updated, setUpdated] = useState<Task>();
  return (
    <>
      <UpdateTaskForm setUpdated={setUpdated} />
      <DisplayTask task={updated} heading="Updated Task" />
    </>
  );
}
