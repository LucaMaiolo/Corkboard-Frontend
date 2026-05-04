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
    const [status, setStatus] = useState("Available")

}
