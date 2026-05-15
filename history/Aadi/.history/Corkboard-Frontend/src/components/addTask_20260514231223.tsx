import type { JSX } from "react";
import { useState, useRef } from "react";
import type { Task } from "./Task";
import { AddTaskForm } from "./addTaskForm";
import { DisplayTask } from "./displayTask";

export function AddTask(): JSX.Element {
  const [added, setAdded] = useState<Task>();
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAdded = (task: Task) => {
    setAdded(task);
    setTimeout(
      () => resultRef.current?.scrollIntoView({ behavior: "smooth" }),
      50,
    );
  };

  return (
    <>
      <AddTaskForm setAdded={handleAdded} />
      <div ref={resultRef}>
        <DisplayTask task={added} heading="Added Task" />
      </div>
    </>
  );
}
