import type { JSX } from "react";
import type { Task } from "./task";
import { Card } from "./card";

export function DisplayTask({
  task,
  heading,
}: {
  task: Task | undefined;
  heading: string;
}): JSX.Element {
  if (!task) {
    return <p>No Task</p>;
  }
  return (
    <>
      <h2>{heading}</h2>
      <Card
        title={task.name}
        description={task.description}
        location={task.location}
        pay={task.pay}
        timeInMins={task.timeInMins}
        status={task.status}
      />
    </>
  );
}
