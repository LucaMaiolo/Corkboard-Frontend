import { type JSX, useState, useEffect } from "react";
import { ListTasks } from "./listTasks";
import type { Task } from "./Task";

export function AllTasks(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    void (async () => {
      const [tasksResponse, sessionResponse] = await Promise.all([
        fetch("http://localhost:1339/tasks"),
        fetch("http://localhost:1339/session/current", { credentials: "include" }),
      ]);
      setTasks((await tasksResponse.json()) as Task[]);
      if (sessionResponse.ok) {
        const data = (await sessionResponse.json()) as { username: string; isAdmin: boolean };
        setIsAdmin(data.isAdmin);
      }
    })();
  }, []);

  return <ListTasks tasks={tasks} isAdmin={isAdmin} />;
}
