import { type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../components/registerForm";

export function RegisterPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 32, maxWidth: 300 }}>
      <h2> Create Account</h2>
      <RegisterForm
        onSuccess={() => {
          void navigate("/login", { state: { registered: true } });
        }}
      />
    </div>
  );
}
