import { type JSX, useState, useEffect } from "react";
import { ListTasks } from "./listTasks";
import type { Task } from "./Task";

export function AllTasks(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    void callGetAllTasks(setTasks);
  }, []);

  const filtered = tasks.filter((task) =>
    task.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          margin: "16px 20px",
          padding: "8px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "1px solid #e4e2e0",
          width: "300px",
        }}
      />
      <ListTasks tasks={filtered} />
    </>
  );
}

async function callGetAllTasks(setTasks: (val: Task[]) => void): Promise<void> {
  const response = await fetch("http://localhost:1339/tasks", {
    method: "GET",
  });
  const result = (await response.json()) as Task[];
  setTasks(result);
}
