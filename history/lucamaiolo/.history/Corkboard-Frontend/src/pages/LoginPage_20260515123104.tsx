import type { JSX } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { LoginForm } from "../components/loginForm";
import "./authPage.css";

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const justRegistered = (location.state as { registered?: boolean } | null)
    ?.registered;

  return (
    <div className="auth-page">
      <div className="auth-inner">
        <span className="auth-eyebrow">Welcome back</span>

        <h1 className="auth-heading">
          Sign in to
          <br />
          Corkboard.
        </h1>

        <p className="auth-subtext">
          {"Don't have an account? "}
          <Link to="/register">Register here</Link>
        </p>

        {justRegistered && (
          <div className="auth-success-banner">
            Account created successfully! Please sign in.
          </div>
        )}

        <div className="auth-card">
          <LoginForm onSuccess={() => void navigate("/")} />
        </div>
      </div>
    </div>
  );
}
