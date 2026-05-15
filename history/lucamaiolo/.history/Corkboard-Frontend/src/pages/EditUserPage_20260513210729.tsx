import { type JSX, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditUserForm } from "../components/editUserForm";
import "./EditUserPage.css";

export function EditUserPage(): JSX.Element {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authState, setAuthState] = useState<
    "loading" | "allowed" | "forbidden"
  >("loading");

  useEffect(() => {
    void fetch("http://localhost:1339/users", { credentials: "include" }).then(
      (res) => {
        if (res.status === 401) {
          setAuthState("forbidden");
          return null;
        }
        void fetch("http://localhost:1339/", { credentials: "include" })
          .then((r) => r.json() as Promise<{ username: string }>)
          .then((data) => {
            setCurrentUser(data.username);
            const isAdminUser = res.status === 200;
            setIsAdmin(isAdminUser);
            if (data.username === username || isAdminUser) {
              setAuthState("allowed");
            } else {
              setAuthState("forbidden");
            }
          });
      }
    );
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
