import type { JSX } from "react";
import type { Task } from "./Task";
import { Card } from "./card";
import { useNavigate, type Link } from "react-router-dom";

export function ListTasks({ tasks }: { tasks: Task[] }): JSX.Element {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: "780px", margin: "0", padding: "0 20px" }}>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "12px  ",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {tasks.map((task) => (
          <li key={task._id} onClick={() => navigate(`/tasks/${task._id}`)}>
            <Card
              title={task.name}
              location={task.location}
              pay={task.pay}
              timeInMins={task.timeInMins}
              status={task.status}
            />
            <Link to={`/offers/${task._id}`}> View Offers</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
