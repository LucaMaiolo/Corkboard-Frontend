import { type JSX, useState, useEffect } from "react";
import { ListTasks } from "./listTasks";
import type { Task } from "./Task";

export function AllTasks(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const [tasksResponse, sessionResponse] = await Promise.all([
        fetch("http://localhost:1339/tasks"),
        fetch("http://localhost:1339/session/current", {
          credentials: "include",
        }),
      ]);
      setTasks((await tasksResponse.json()) as Task[]);
      if (sessionResponse.ok) {
        const data = (await sessionResponse.json()) as {
          username: string;
          isAdmin: boolean;
        };
        setIsAdmin(data.isAdmin);
        setCurrentUser(data.username);
      }
    })();
  }, []);

  const filtered = tasks.filter((task) =>
    task.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ padding: "32px 20px, maxWidth: 780px", margin: "0 auto" }}>
      <h2
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontWeight: 400,
          fontSize: "26px",
          marginBottom: "20px",
        }}
      >
        Tasks
      </h2>
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          margin: "20px",
          padding: "10px 14px",
          fontSize: "14px",
          borderRadius: "8px",
          border: "1.5px solid #e4e2e0",
          width: "300px",
          fontFamily: "'DM Sans', sans-serif",
          outline: "none",
          background: "#faf9f7",
        }}
      />
      <ListTasks tasks={filtered} isAdmin={isAdmin} currentUser={currentUser} />
    </div>
  );
}
