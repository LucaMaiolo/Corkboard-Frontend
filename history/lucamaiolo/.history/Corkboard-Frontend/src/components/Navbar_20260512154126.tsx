import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, type JSX, type CSSProperties } from "react";
import { LogoutButton } from "./logoutButton";

export function Navbar(): JSX.Element {
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
            <LogoutButton
              onLogout={() => {
                setUsername(null);
                void navigate("/");
              }}
            />
          </>
        )}
        {!username && (
          <>
            <NavLink to="/login" style={linkStyle}>
              Login
            </NavLink>
          </>
        )}
        <NavLink to="/register" style={{ fontSize: "14px" }}>
          Register
        </NavLink>
      </div>
    </nav>
  );
}
