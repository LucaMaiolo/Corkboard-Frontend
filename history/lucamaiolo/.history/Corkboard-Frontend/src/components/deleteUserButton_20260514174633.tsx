import { type JSX, useState } from "react";

interface Props {
  username: string;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

export function DeleteUserButton({
  username,
  onSuccess,
  onError,
}: Props): JSX.Element {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [hovering, setHovering] = useState(false);

  async function handleDelete(): Promise<void> {
    const response = await fetch(`http://localhost:1339/users/${username}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      onSuccess();
    } else {
      const msg = await response.text();
      onError(msg);
    }
  }

  return (

    <>
    {!confirmDelete ? (
        <button className="delete-btn" onClick={() => setConfirmDelete(true)} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
          {hovering ? "Are you sure?" : "Delete Account"}
    )}
    </>
  )
}
