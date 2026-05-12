import type { SubmitEvent, JSX } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Task } from "./Task";
import "./addTaskForm.css";

export function UpdateTaskForm({
  setUpdated,
}: {
  setUpdated: (val: Task) => void;
}): JSX.Element {
  const [searchParams] = useSearchParams();
  const prefill = searchParams.get("name");
  const [oldName, setOldName] = useState<string | null>(null);
  const [newName, setNewName] = useState<string | null>(null);
  const [newDescription, setNewDescription] = useState<string | null>(null);
  const [newLocation, setNewLocation] = useState<string | null>(null);
  const [newPay, setNewPay] = useState<number | null>(null);
  const [newTimeInMins, setNewTimeInMins] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<string | null>("Available");

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    if (
      !oldName ||
      !newName ||
      !newDescription ||
      !newLocation ||
      newPay === null ||
      newTimeInMins === null ||
      !newStatus
    ) {
      alert("Fill out all fields before submitting");
      return;
    }

    const response = await fetch(`http://localhost:1339/Tasks/${oldName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        description: newDescription,
        location: newLocation,
        pay: newPay,
        timeInMins: newTimeInMins,
        status: newStatus,
      }),
    });

    if (!response.ok) {
      alert("Task not found or update failed");
      return;
    }

    const result = await response.json();

    setUpdated(result);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="oldName">Current Name</label>
      <input
        type="text"
        placeholder="Current Name..."
        onChange={(e) => setOldName(e.target.value)}
      />

      <label htmlFor="newName">New Name</label>
      <input
        type="text"
        placeholder="New Name..."
        onChange={(e) => setNewName(e.target.value)}
      />
      <label htmlFor="newDescription">New Description</label>
      <input
        type="text"
        placeholder="New Description..."
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <label htmlFor="newLocation">New Location</label>
      <input
        type="text"
        placeholder="New Location..."
        onChange={(e) => setNewLocation(e.target.value)}
      />
      <label htmlFor="newPay">New Pay</label>
      <input
        type="number"
        placeholder="New Pay..."
        onChange={(e) => setNewPay(e.target.valueAsNumber)}
      />
      <label htmlFor="newTimeInMins">New Time in Mins</label>
      <input
        type="number"
        placeholder="New Time in Mins..."
        onChange={(e) => setNewTimeInMins(e.target.valueAsNumber)}
      />
      <label htmlFor="newStatus">New Status</label>
      <select onChange={(e) => setNewStatus(e.target.value)} required>
        <option value="Available">Available</option>
        <option value="InProgress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Update Task</button>
    </form>
  );
}
