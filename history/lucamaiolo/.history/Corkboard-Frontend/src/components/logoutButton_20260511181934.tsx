import { type JSX } from "react";

interface Props {
  onLogout: () => void;
}

export function LogoutButton({ onLogout }: Props): JSX.Element {
  async function handleLogout(): Promise<void> {
    await fetch("http://localhost:1339/session/logout", {
      credentials: "include",
    });
    onLogout();
  }

  return (
    <button
      onClick={() => {
        void handleLogout();
      }}
    >
      Logout
    </button>
  );
}
