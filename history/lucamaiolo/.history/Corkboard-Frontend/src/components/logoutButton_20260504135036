import type { JSX } from "react";
import { useAuth } from "../context/AuthContext";


export function LogoutButton(): JSX.Element{
    const { setUsername }=useAuth();


    async function handleLogout(): Promise<void>{
        await fetch("http://localhost:1339/session/logout", {
            method: "GET",
            credentials: "include",
          });
          setUsername(null);
    }

    return (
        <button onClick={() => { void handleLogout(); }}>Logout</button>
      );
}