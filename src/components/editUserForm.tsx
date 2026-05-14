import { type JSX, useState } from "react";

interface EditUserFormProps {
  username: string;
  currentUser: string;
  isAdmin: boolean;
  onSuccess: () => void;
}

export function EditUserForm({
  username,
  onSuccess,
  isAdmin,
  currentUser,
}: EditUserFormProps): JSX.Element {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(): Promise<void> {
    setError(null);

    if (!currentPassword && !isAdmin) {
      setError("Current password is required");
      return;
    }

    const body: Record<string, string> = { currentPassword };
    if (!isAdmin) body.currentPassword = currentPassword;
    if (newPassword) body.newPassword = newPassword;
    if (email) body.email = email;
    if (birthday) body.birthday = birthday;

    const response = await fetch(`http://localhost:1339/users/${username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (response.ok) {
      setSuccess(true);
      setTimeout(() => onSuccess(), 1200); // this is to show a little message saying "success" before redirecting
    } else {
      const msg = await response.text();
      setError(msg);
    }
  }

  return (
    <div className="edit-user-form">
      {success && (
        <p className="edit-user-form-success">Updated! Redirecting...</p>
      )}
      {error && <p className="edit-user-form-error">{error}</p>}

      {(!isAdmin || currentUser === username) && (
        <>
          <label>
            Current Password <span className="required">*</span>
          </label>
          <input
            type="password"
            placeholder="Required to save any changes"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </>
      )}

      <label>
        New Password <span className="optional">(optional)</span>
      </label>
      <input
        type="password"
        placeholder="Leave blank to keep current password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <label>
        Email <span className="optional">(optional)</span>
      </label>
      <input
        type="email"
        placeholder="Leave blank to keep current password"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>
        New Birthday <span className="optional">(optional)</span>
      </label>
      <input
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />
      <button onClick={() => void handleSubmit()}>Save Changes</button>
    </div>
  );
}
