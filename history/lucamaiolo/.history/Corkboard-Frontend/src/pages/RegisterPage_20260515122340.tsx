import type { JSX } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RegisterForm } from "../components/registerForm";
import "./authPage.css";

export function RegisterPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-inner">
        <span className="auth-eyebrow">Join Corkboard</span>

        <h1 className="auth-heading">
          Create your
          <br />
          account.
        </h1>

        <p className="auth-subtext">
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>

        <div className="auth-card">
          <RegisterForm
            onSuccess={() => {
              void navigate("/login", { state: { registered: true } });
            }}
          />
        </div>
      </div>
    </div>
  );
}
