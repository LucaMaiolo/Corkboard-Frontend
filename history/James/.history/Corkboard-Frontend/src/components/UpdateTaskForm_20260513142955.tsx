import type { SubmitEvent, JSX } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { Task } from "./Task";
import "./AddTaskForm.css";

export function UpdateTaskForm({
  setUpdated,
}: {
  setUpdated: (val: Task) => void;
}): JSX.Element {
  const [searchParams] = useSearchParams();
  const prefillId = searchParams.get("id");

  const [oldName, setOldName] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newLocation, setNewLocation] = useState<string>("");
  const [newPay, setNewPay] = useState<number | "">("");
  const [newTimeInMins, setNewTimeInMins] = useState<number | "">("");
  const [newStatus, setNewStatus] = useState<string>("Available");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!prefillId) return;

    const fetchTask = async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:1339/tasks/id/${prefillId}`,
      );

      if (!response.ok) {
        alert("Could not load task for prefill");
        return;
      }
      const task = (await response.json()) as Task;
      setOldName(task.name);
      setNewName(task.name);
      setNewDescription(task.description);
      setNewLocation(task.location);
      setNewPay(task.pay);
      setNewTimeInMins(task.timeInMins);
      setNewStatus(task.status);
      setLoading(false);
    };
    void fetchTask();
  }, [prefillId]);

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    if (
      !oldName ||
      !newName ||
      !newDescription ||
      !newLocation ||
      newPay === "" ||
      newTimeInMins === "" ||
      !newStatus
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

    const result = (await response.json()) as Task;
    setUpdated(result);
  };
  if (loading) return <p>Loading...</p>;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="oldName">Current Name</label>
      <input
        type="text"
        placeholder="Current Name..."
        value={oldName}
        onChange={(e) => setOldName(e.target.value)}
      />

      <label htmlFor="newName">New Name</label>
      <input
        type="text"
        placeholder="New Name..."
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <label htmlFor="newDescription">New Description</label>
      <input
        type="text"
        value={newDescription}
        placeholder="New Description..."
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <label htmlFor="newLocation">New Location</label>
      <input
        type="text"
        placeholder="New Location..."
        value={newLocation}
        onChange={(e) => setNewLocation(e.target.value)}
      />
      <label htmlFor="newPay">New Pay</label>
      <input
        type="number"
        placeholder="New Pay..."
        value={newPay}
        onChange={(e) => setNewPay(e.target.valueAsNumber)}
      />
      <label htmlFor="newTimeInMins">New Time in Mins</label>
      <input
        type="number"
        value={newTimeInMins}
        placeholder="New Time in Mins..."
        onChange={(e) => setNewTimeInMins(e.target.valueAsNumber)}
      />
      <label htmlFor="newStatus">New Status</label>
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        required
      >
        <option value="Available">Available</option>
        <option value="InProgress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Update Task</button>
    </form>
  );
}