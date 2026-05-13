import type { JSX } from "react";
import "./UserCard.css";

export interface User {
    name: string;
    email: string;
    birthday: Date
    isAdmin: boolean;
}

export function UserCard({User} : {User: User}): JSX.Element {
    return (
        <div className="user-card">
            <div className="user-card-top">
                <p className="user-name">{User.name}</p>
                <span className={`user-card-badge ${user.isAdmin ? "admin" : "user"}`}>
          {user.isAdmin ? "Admin" : "User"}
          </span>

            </div>
        </div>

}