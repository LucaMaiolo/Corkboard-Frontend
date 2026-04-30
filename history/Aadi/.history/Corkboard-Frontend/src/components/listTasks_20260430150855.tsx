import type { JSX } from "react";
import type { Task } from "./Task";
import { Card } from "./card";

export function ListTasks({ tasks }: { tasks: Task[] }): JSX.Element {
  return (
    <div>
      <h1>All Task</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <Card>
              {task.name} with description {task.description} in {task.location}{" "}
              pays {task.pay}
              takes {task.timeInMins} mins and is {task.status}.
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
