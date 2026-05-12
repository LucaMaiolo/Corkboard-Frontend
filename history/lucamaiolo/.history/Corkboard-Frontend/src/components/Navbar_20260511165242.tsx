import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, type JSX, type CSSProperties } from "react";
import { LoginForm } from "./loginForm";

export function Navbar(): JSX.Element {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    void fetch("http://localhost:1339/", { credentials: "include" })
      .then((response) => {
        if (!response.ok) return null;
        return response.json() as Promise<{ username: string }>;
      })
      .then((data) => {
        if (data) setUsername(data.username);
      });
  }, []);

  const linkStyle = ({ isActive }: { isActive: boolean }): CSSProperties => ({
    color: isActive ? "var(--cb-orange)" : "var(--cb-text)",
    fontWeight: 600,
    textDecoration: "none",
    fontSize: "15px",
  });

  return (
    <nav
      style={{
        background: "var(--cb-white)",
        borderBottom: "1px solid var(--cb-gray-100)",
        height: "56px",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: "32px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <span
        style={{ fontWeight: 700, fontSize: "18px", color: "var(--cb-orange)" }}
      >
        📌 Corkboard
      </span>
      <NavLink to="/" end style={linkStyle}>
        Home
      </NavLink>
      <NavLink to="/all-tasks" style={linkStyle}>
        Tasks
      </NavLink>
      <NavLink to="/create" style={linkStyle}>
        Create
      </NavLink>

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {username && (
  <>
    <span style={{ fontSize: "14px", color: "var(--cb-text-muted)" }}>
      {username}
    </span>
    <button
      onClick={() => {
        void fetch("http://localhost:1339/session/logout", {
          credentials: "include",
        }).then(() => {
          setUsername(null);
          void navigate("/");
        });
      }}
    >
      Logout
    </button>
  </>
)}
{!username && (
  <>
    <NavLink to="/login" style={{ fontSize: "14px" }}>Login</NavLink>
    <NavLink to="/register" style={{ fontSize: "14px" }}>Register</NavLink>
  </>
)}

    
    </nav>
  );
}
