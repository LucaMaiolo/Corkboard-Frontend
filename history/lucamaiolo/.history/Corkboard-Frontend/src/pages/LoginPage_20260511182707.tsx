import type { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/loginForm";

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 56px)",
      }}
    >
<div style={{
        background: "var(--cb-white)",
        border: "1px solid var(--cb-gray-100)",
        borderRadius: "var(--cb-radius-md)",
        padding: "32px",
        width: "100%",
        maxWidth: "320px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}>
        <h2 style={{ color: "var(--cb-text)", margin: 0 }}>Sign In</h2>      <LoginForm
        onSuccess={() => {
          void navigate("/");
        }}
      />
    </div>
  );
}
