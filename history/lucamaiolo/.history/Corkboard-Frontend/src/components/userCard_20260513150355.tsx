import type { JSX } from "react";
import "./UserCard.css";

export interface User {
  username: string;
  email: string;
  birthday: Date;
  isAdmin: boolean;
}

export function UserCard({ user }: { user: User }): JSX.Element {
  return (
    <div className="user-card">
      <div className="user-card-top">
        <p className="user-name">{user.name}</p>
        <span className={`user-card-badge ${user.isAdmin ? "admin" : "user"}`}>
          {user.isAdmin ? "Admin" : "User"}
        </span>
      </div>
      <p className="user-email">{user.email}</p>
      <p className="user-birthday">
        Birthday: {user.birthday.toLocaleDateString()}
      </p>
    </div>
  );
}
