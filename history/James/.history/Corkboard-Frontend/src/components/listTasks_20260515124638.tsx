import type { JSX } from "react";
import type { Task } from "./Task";
import { Card } from "./card";
import { useNavigate, Link } from "react-router-dom";

export function ListTasks({
  tasks,
  isAdmin,
  currentUser,
}: {
  tasks: Task[];
  isAdmin: boolean;
  currentUser?: string | null;
}): JSX.Element {
  const navigate = useNavigate();

  const raw = document.cookie
    .split("; ")
    .find((r) => r.startsWith("recentlyViewed="))
    ?.split("=")[1];
  const recentlyViewed: string[] = raw
    ? (JSON.parse(decodeURIComponent(raw)) as string[])
    : [];
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
          <li
            key={task._id}
            onClick={() => navigate(`/tasks/${task._id}`)}
            style={{ cursor: "pointer" }}
          >
            <Card
              title={task.name}
              location={task.location}
              pay={task.pay}
              timeInMins={task.timeInMins}
              status={task.status}
            >
              {recentlyViewed.includes(task._id) && (
                <span
                  style={{
                    fontSize: "11px",
                    color: "#e27002",
                    fontWeight: 600,
                  }}
                >
                  Recently viewed
                </span>
              )}
              {(isAdmin || currentUser === task.listerId) && (
                <Link
                  to={`/offers/${task._id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  View Offers
                </Link>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
