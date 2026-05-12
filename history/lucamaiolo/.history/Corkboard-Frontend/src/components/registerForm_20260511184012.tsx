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

            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <input placeholder="Birthday" type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />

            <button onClick={() => {void handleRegister();}}>Register</button>
        </div>
    )
}