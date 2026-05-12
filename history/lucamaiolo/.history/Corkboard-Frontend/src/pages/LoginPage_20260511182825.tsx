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
      Sign In
      <LoginForm
        onSuccess={() => {
          void navigate("/");
        }}
      />
    </div>
  );
}
