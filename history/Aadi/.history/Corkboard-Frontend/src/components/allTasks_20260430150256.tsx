import  { type JSX, useState } from "react";
import { ListTasks } from "./listTasks";
import type { Task } from "./Task";

export function AllTasks(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <>
      <button onClick={() => callGetAllTasks(setTasks)}>Get All Tasks</button>
      <ListTasks tasks={tasks} />
    </>
  );
}

async function callGetAllTasks(setTasks: (val: Task[]) => void): Promise<void> {
  const response = await fetch("http://localhost:1339/Tasks", {
    method: "GET",
  });
  const result = (await response.json()) as Task[];
  setTasks(result);
}
