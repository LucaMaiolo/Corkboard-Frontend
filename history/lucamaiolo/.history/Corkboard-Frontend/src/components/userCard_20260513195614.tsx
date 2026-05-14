import { useNavigate } from "react-router-dom";

import type { JSX } from "react";
import "./userCard.css";

export interface User {
  username: string;
  email: string;
  birthday: Date;
  isAdmin: boolean;
}

export function UserCard({ user }: { user: User }): JSX.Element {
  const navigate = useNavigate();
  return (
    <div
      className="user-card"
      onClick={() => void navigate(`/users/${user.username}/edit`)}
      style={{ cursor: "pointer" }}
    >
      <div className="user-card-top">
        <p className="user-card-username">{user.username}</p>
        <span className={`user-card-badge ${user.isAdmin ? "admin" : "user"}`}>
          {user.isAdmin ? "Admin" : "User"}
        </span>
      </div>
      <p className="user-card-email">{user.email}</p>
    </div>
  );
}
