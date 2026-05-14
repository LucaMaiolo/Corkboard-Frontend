import type { JSX } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "../components/loginForm";

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const justRegistered = (location.state as { registered?: boolean } | null)
    ?.registered;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 56px)",
      }}
    >
      {}

      <h1>Sign In</h1>
      <h1> </h1>
      <LoginForm
        onSuccess={() => {
          void navigate("/");
        }}
      />
    </div>
  );
}
