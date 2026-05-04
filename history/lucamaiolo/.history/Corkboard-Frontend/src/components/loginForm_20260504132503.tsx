import { useState } from "react";
import type { JSX } from "react";

interface Props {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: Props): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(): Promise<void> {
    const response = await fetch("http://localhost:1339/session/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) onSuccess();
    else setError("Login failed. Please check your credentials.");
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => {
          void handleLogin();
        }}
      >
        Login
      </button>
    </div>
  );
}
