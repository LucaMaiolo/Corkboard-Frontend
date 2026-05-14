import { type JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCard, type User } from "../components/userCard";
import "../components/userCard.css";

type PageState = "loading" | "unauthorized" | "forbidden" | "success" | "error";

export function UsersPage(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [state, setState] = useState<PageState>("loading");
  const navigate = useNavigate();

  useEffect(() => {
    void fetch("http://localhost:1339/users", { credentials: "include" })
      .then((response) => {
        if (response.status === 401) {
          setState("unauthorized");
          return null;
        }
        if (response.status === 403) {
          setState("forbidden");
          return null;
        }
        if (!response.ok) {
          setState("error");
          return null;
        }
        return response.json() as Promise<User[]>;
      })
      .then((data) => {
        if (data) {
          setUsers(data);
          setState("success");
        }
      })
      .catch(() => setState("error"));
  }, []);

  if (state === "loading") {
    return <p>Loading...</p>;
  }
  if (state === "unauthorized") {
    return (
      <div>
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }
  if (state === "forbidden") {
    return (
      <div>
        <p>
          You do not have permission to view this page. Please contact an admin
          if this is a mistake.
        </p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }
  if (state === "error") {
    return (
      <div>
        <p>An error occurred while fetching users. Please try again later.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="users-page">
      <h1>Users</h1>
      <div className="user-list">
        {users.map((user) => (
          <UserCard key={user.username} user={user} />
        ))}
      </div>
    </div>
  );
}
