import { type JSX, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditUserForm } from "../components/editUserForm";

export function EditUserPage(): JSX.Element {
  const [username] = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authState, setAuthState] = useState<
    "loading" | "allowed" | "forbidden"
  >("loading");

  useEffect(() => {
    void fetch("http://localhost:1339/", { credentials: "include" }).then(
      (res) => {
        if (!res.ok) return null;
        return res.json() as Promise<{ username: string; isAdmin: boolean }>;
      }
    );
  });
}
