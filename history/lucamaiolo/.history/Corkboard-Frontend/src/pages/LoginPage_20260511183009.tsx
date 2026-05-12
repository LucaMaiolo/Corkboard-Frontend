import type { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/loginForm";

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();

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
      <h2>Sign In</h2>

      <LoginForm
        onSuccess={() => {
          void navigate("/");
        }}
      />
    </div>
  );
}
