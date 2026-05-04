import type { SubmitEvent, JSX } from "react";
import { useState } from "react";
import type { Task } from "./task";

export function AddTaskForm({
    setAdded,
}: {
    setAdded: (val: Task) => void;
}): JSX.Element {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [pay, setPay] = useState(0);
    const [timeInMins, setTimeInMins] = useState(0);
    const [status, setStatus] = useState("Available");

    const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                name: name,
                description: description,
                location: location,
                pay: pay,
                timeInMins: timeInMins,
                status: status
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            }
        };
        const response = await fetch("http://localhost:1339/Tasks", requestOptions);
        const result = await response.json();
        setAdded(result);
    };

}
