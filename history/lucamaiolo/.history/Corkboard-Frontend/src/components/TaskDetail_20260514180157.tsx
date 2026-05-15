import { useEffect, useState, type JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Task } from "./Task";
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
    };

    void fetchTask();
  }, [id]);

  const handleDelete = async () => {
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

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: "0 20px" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "16" }}>
        Back
      </button>
      <h1>{task.name}</h1>
      <p>{task.description}</p>
      <p>Location: {task.location}</p>
      <p>Pay: ${task.pay}</p>
      <p>Time Required: {task.timeInMins}</p>
      <p>Status: {task.status}</p>

      <button
        onClick={() => navigate(`/update?id=${task._id}`)}
        style={{ marginTop: "16px" }}
      >
        Edit Task
      </button>
      <button
        onClick={handleDelete}
        style={{ marginTop: "16px", marginLeft: "8px" }}
      >
        Delete Task
      </button>
    </div>
  );
}
