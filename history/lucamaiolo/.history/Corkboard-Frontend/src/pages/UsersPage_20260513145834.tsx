import { type JSX, useEffect, useState } from "react";
import { UserCard, type User } from "../components/UserCard";


type PageState = "loading" | "unauthorized" | "forbidden" | "success" | "error";

export function UsersPage(): JSX.Element {

    const [users, setUsers] = useState<User[]>([]);
    const [state, setState] = useState<PageState>("loading");

     useEffect(() => {
        void fetch("http://localhost:1339/users", { credentials: "include" })
        .then((response) => {
            if (response.status === 401) {
                setState("unauthorized");
                return null;
            }
}