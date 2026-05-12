import { type JSX, useState } from "react";

export const AddOfferForm = ({ gigId }: { gigId: string }): JSX.Element => {
  const [price, setPrice] = useState<number | "">("");
  const [message, setMessage] = useState("");

  return (
    <form>
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
