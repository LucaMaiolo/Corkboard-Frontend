import { useEffect, useState, type JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Task } from "./Task";
import "./AddTaskForm.css";
export function TaskDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:1339/tasks/${id}`);
      const data = (await response.json()) as Task;
      setTask(data);

      const raw = document.cookie
        .split("; ")
        .find((r) => r.startsWith("recentlyViewed="))
        ?.split("=")[1];
      const existing: string[] = raw
        ? (JSON.parse(decodeURIComponent(raw)) as string[])
        : [];

      const updated = [
        data._id,
        ...existing.filter((i) => i !== data._id),
      ].slice(0, 20);

      document.cookie = `recentlyViewed=${encodeURIComponent(JSON.stringify(updated))}; path=/; max-age=${60 * 60 * 4}`;
    };
    void fetchTask();
  }, [id]);

  useEffect(() => {
    void fetch("http://localhost:1339/users", { credentials: "include" })
      .then((res) => {
        setIsAdmin(res.status === 200);
        return fetch("http://localhost:1339/", { credentials: "include" });
      })
      .then((res) => {
        if (!res.ok) return null;
        return res.json() as Promise<{ username: string }>;
      })
      .then((data) => {
        if (data) setCurrentUser(data.username);
      });
  }, []);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    const response = await fetch(`http://localhost:1339/tasks/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      alert("Failed to delete task or Task not found");
      return;
    }

    navigate("/all-tasks");
  };

  if (!task) return <p>Loading ...</p>;

  const canModify = isAdmin || currentUser === task.listerId;

  return (
    <div className="task-detail">
      <button className="btn-back" onClick={() => navigate(-1)}>
        Back
      </button>

      <div className="task-detail-card">
        <h1>{task.name}</h1>
        <span className="task-detail-badge">{task.status}</span>

        <p className="task-detail-desc">{task.description}</p>

        <div className="task-detail-meta">
          <div className="task-meta-item">
            <div className="task-meta-label">Location</div>
            <div className="task-meta-value">{task.location}</div>
          </div>
          <div className="task-meta-item">
            <div className="task-meta-label">Pay</div>
            <div className="task-meta-value">{task.pay}</div>
          </div>
          <div className="task-meta-item">
            <div className="task-meta-label">Time Required</div>
            <div className="task-meta-value">{task.timeInMins}</div>
          </div>
          <div className="task-meta-item">
            <div className="task-meta-label">Posted by</div>
            <div className="task-meta-value">{task.listerId}</div>
          </div>
        </div>

        <div className="task-detail-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/update?id=${task._id}`)}
          >
            Edit Task
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
