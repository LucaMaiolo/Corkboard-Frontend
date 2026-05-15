import { type JSX, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditUserForm } from "../components/editUserForm";
import "../components/AddTaskForm.css";

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
    return <p style={{ padding: "32px" }}>Loading...</p>;
  }

  if (authState === "forbidden") {
    return (
      <div className="page-center">
        <div className="page-card">
          <h2>Access Denied</h2>
          <p style={{ fontSize: "14px", color: "#888", marginBottom: "16px" }}>
            You do not have permission to view this page.
          </p>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-center">
      <div className="page-card">
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>Edit Account</h2>
        <p
          style={{
            fontSize: "13px",
            color: "#888",
            marginBottom: "20px",
            marginTop: "-16px",
          }}
        >
          Editing: <strong style={{ color: "#1a1714" }}>{username}</strong>
        </p>
        <EditUserForm
          username={username!}
          currentUser={currentUser!}
          isAdmin={isAdmin}
          onSuccess={() => navigate("/users")}
        />
      </div>
    </div>
  );
}
