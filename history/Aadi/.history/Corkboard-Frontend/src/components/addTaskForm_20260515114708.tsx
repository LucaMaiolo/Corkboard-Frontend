import type { SubmitEvent, JSX } from "react";
import { useState } from "react";
import type { Task } from "./Task";
import "./AddTaskForm.css";

export function AddTaskForm({
  setAdded,
}: {
  setAdded: (val: Task) => void;
}): JSX.Element {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [pay, setPay] = useState<number | "">("");
  const [timeInMins, setTimeInMins] = useState<number | "">("");
  const [status, setStatus] = useState("Available");

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      credentials: "include" as RequestCredentials,
      body: JSON.stringify({
        name: name,
        description: description,
        location: location,
        pay: pay,
        timeInMins: timeInMins,
        status: status,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    const response = await fetch("http://localhost:1339/tasks", requestOptions);
    if (!response.ok) {
      alert(`Failed to create task: ${await response.text()}`);
      return;
    }
    const result = (await response.json()) as Task;
    setAdded(result);
  };

  return (
    <div className="page-center">
      <div className="page-card">
        <h2>Post a Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Description (5 characters minimum)
            </label>
            <input
              type="text"
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pay">Pay</label>
            <input
              type="number"
              placeholder="Pay..."
              value={pay}
              onChange={(e) => setPay(Number(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="timeInMins">Time in mins</label>
            <input
              type="number"
              placeholder="Time in mins..."
              value={timeInMins}
              onChange={(e) => setTimeInMins(Number(e.target.value))}
              required
            />
            <button type="submit">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}
