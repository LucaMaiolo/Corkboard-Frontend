import { type JSX, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditUserForm } from "../components/editUserForm";

export function EditUserPage(): JSX.Element {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authState, setAuthState] = useState<
    "loading" | "allowed" | "forbidden"
  >("loading");

  useEffect(() => {
    void fetch("http://localhost:1339/", { credentials: "include" })
      .then((res) => {
        if (!res.ok) return null;
        return res.json() as Promise<{ username: string; isAdmin: boolean }>;
      })
      .then((data) => {
        if (!data) {
          setAuthState("forbidden");
          return;
        }
        if (data.username == username || data.isAdmin) {
          setCurrentUser(data.username);
          setIsAdmin(data.isAdmin);
          setAuthState("allowed");
        } else {
          setAuthState("forbidden");
        }
      });
  }, [username]);

  if (authState === "loading") {
    return <p>Loading...</p>;
  }
  if (authState === "forbidden") {
    return (
      <div className="edit-user-message">
        <p>You do not have permission to view this page.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="edit-user-page">
      <button className="edit-user-back" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <h1>Edit Account</h1>
      <p className="edit-user-subtitle">
        {" "}
        Editing: <strong>{username}</strong>
        <EditUserForm
          username={username!}
          currentUser={currentUser!}
          isAdmin={isAdmin}
          onSuccess={() => navigate("/users")}
        />
      </p>
    </div>
  );
}
