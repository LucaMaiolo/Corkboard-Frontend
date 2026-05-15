import type { JSX } from "react";
import { useState, useRef } from "react";
import { UpdateTaskForm } from "./UpdateTaskForm";
import type { Task } from "./Task";
import { DisplayTask } from "./displayTask";

export function UpdateTask(): JSX.Element {
  const [updated, setUpdated] = useState<Task>();
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAdded = (task: Task) => {
    setUpdated(task);
    setTimeout(
      () => resultRef.current?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  };
  return (
    <>
      <UpdateTaskForm setUpdated={setUpdated} />
      <div ref={resultRef}>
        <DisplayTask task={updated} heading="Updated Task" />
      </div>
    </>
  );
}
