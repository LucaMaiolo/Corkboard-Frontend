import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import type { JSX, CSSProperties } from "react";
import { useState, useEffect } from "react";

export function Navbar(): JSX.Element {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    void fetch("http://localhost:1339/", { credentials: "include" })
      .then((response) => {
        if (!response.ok)
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
      <NavLink to="/login" style={linkStyle}>
        Login
      </NavLink>
    </nav>
  );
}
