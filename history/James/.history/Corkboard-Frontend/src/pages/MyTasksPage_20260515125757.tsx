import { type JSX, useEffect, useState } from "react";
import { ListTasks } from "../components/listTasks";
import type { Task } from "../components/Task";

export const MyTasksPage = (): JSX.Element => {
  const [myTasks, setMyTasks] = useState<Task[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    void (async () => {
      const [tasksResponse, sessionResponse] = await Promise.all([
        fetch("http://localhost:1339/tasks"),
        fetch("http://localhost:1339/session/current", { credentials: "include" }),
      ]);
      const allTasks = (await tasksResponse.json()) as Task[];
      if (sessionResponse.ok) {
        const data = (await sessionResponse.json()) as { username: string; isAdmin: boolean };
        setCurrentUser(data.username);
        setMyTasks(allTasks.filter((task) => task.listerId === data.username));
      }
    })();
  }, []);

  const filtered = myTasks.filter((task) =>
    task.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ paddingTop: "32px", paddingBottom: "32px", paddingLeft: "20px", paddingRight: "20px", maxWidth: "780px", marginTop: "0", marginBottom: "0", marginLeft: "auto", marginRight: "auto" }}>
      <h2 style={{ fontFamily: "sans-serif", fontWeight: 400, fontSize: "26px", marginBottom: "20px" }}>
        My Tasks
      </h2>
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          marginLeft: "20px",
          marginRight: "20px",
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingLeft: "14px",
          paddingRight: "14px",
          fontSize: "14px",
          borderRadius: "8px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "hsl(30, 25%, 85%)",
          width: "300px",
          outline: "none",
          background: "hsl(30, 25%, 98%)",
        }}
      />
      {filtered.length === 0
        ? <p style={{ color: "hsl(0, 0%, 50%)", marginLeft: "20px" }}>No tasks found.</p>
        : <ListTasks tasks={filtered} isAdmin={false} currentUser={currentUser} />
      }
    </div>
  );
};
