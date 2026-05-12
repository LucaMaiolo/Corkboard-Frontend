import { type JSX, type SubmitEvent, useState } from "react";

export const AddOfferForm = ({ gigId, onAdded }: { gigId: string; onAdded: () => void }): JSX.Element => {
  const [price, setPrice] = useState<number | "">("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: SubmitEvent) => {
    // prevent the browser's default full-page reload on form submit
    event.preventDefault();
    await fetch("http://localhost:1339/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ gigId, price: price as number, message: message || undefined }),
    });
    setPrice("");
    setMessage("");
    onAdded();
  };

  return (
    <form onSubmit={(event) => void handleSubmit(event)}>
      <label>
        Price ($)
        <input
          type="number"
          placeholder="Price"
          min={0}
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
          required
        />
      </label>

      <label>
        Message (optional)
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>

      <button type="submit">Submit Offer</button>
    </form>
  );
};
