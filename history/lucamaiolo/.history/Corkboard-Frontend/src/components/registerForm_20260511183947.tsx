import { useState, type JSX } from "react";

interface Props {
    onSuccess: () => void;
}

export function RegisterForm({onSuccess}: Props): JSX.Element {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [error, setError] = useState<string | null>(null);

    async function handleRegister(): Promise<void> {

        const response = await fetch("http://localhost:1339/users/", {
            method : "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({username, password, email, birthday}),
    });

    if (response.ok) {
        onSuccess();
    } else{
        const msg = await response.text();
        setError(msg);
    }
    return (
        <div style={{display: "flex", flexDirection: "column", gap: 12}}>
            {error && <p style={{color: "red"}}>{error}</p>}
            <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
    )
}