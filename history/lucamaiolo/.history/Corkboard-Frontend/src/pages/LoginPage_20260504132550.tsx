import type { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 32, maxWidth: 300 }}>
      <h2>Sign In</h2>
      <LoginForm
        onSuccess={() => {
          void navigate("/");
        }}
      />
    </div>
  );
}
