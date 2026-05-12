import type { SubmitEvent, JSX } from "react";
import { useState } from "react";
import type { Task } from "./Task";

export function UpdateTaskForm({
  setUpdated,
}: {
  setUpdated: (val: Task) => void;
}): JSX.Element {
  const [oldName, setOldName] = useState<string | null>(null);
  const [newName, setNewName] = useState<string | null>(null);
  const [newDescription, setNewDescription] = useState<string | null>(null);
  const [newPay, setNewPay] = useState<number | null>(null);
  const [newTimeInMins, setNewTimeInMins] = useState<number | null>(null);

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    if (
      !oldName ||
      !newName ||
      !newDescription ||
      newPay === null ||
      newTimeInMins === null
    ) {
      alert("Fill out all fields before submitting");
      return;
    }

    const response = await fetch(`http://localhost:1339/tasks/${oldName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        description: newDescription,
        pay: newPay,
        timeInMins: newTimeInMins,
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
      <label htmlFor="newPay">New Pay</label>
      <input
        type="number"
        placeholder="New Pay..."
        onChange={(e) => setNewPay(e.target.valueAsNumber)}
      />
      <label htmlFor="newEstimatedTimeInMins">New Estimated time in Mins</label>
      <input
        type="number"
        placeholder="New Estimated time in Mins..."
        onChange={(e) => setNewTimeInMins(e.target.valueAsNumber)}
      />
      <button type="submit">Update Pokemon</button>
    </form>
  );
}
