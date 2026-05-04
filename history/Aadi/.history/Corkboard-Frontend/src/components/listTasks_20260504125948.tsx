import type { JSX } from "react";
import type { Task } from "./task";
import { Card } from "./card";

export function ListTasks({ tasks }: { tasks: Task[] }): JSX.Element {
  return (
    <div>
      <h1>All Task</h1>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "12px  ",
        }}
      >
        {tasks.map((task) => (
          <li key={task._id}>
            <Card
              title={task.name}
              description={task.description}
              location={task.location}
              pay={task.pay}
              timeInMins={task.timeInMins}
              status={task.status}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
