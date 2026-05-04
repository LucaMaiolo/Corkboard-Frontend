import { useState } from "react";
import type { JSX } from "react";

interface Props {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: Props): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
}
