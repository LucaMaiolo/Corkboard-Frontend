import { type JSX, type SubmitEvent, useState, useEffect, useRef } from "react";

const DRAFT_COOKIE_PREFIX = "offer_draft_";
const DEBOUNCE_MS = 5000;

const saveDraft = (gigId: string, price: number | "", message: string): void => {
  const value = JSON.stringify({ price, message });
  document.cookie = `${DRAFT_COOKIE_PREFIX}${gigId}=${encodeURIComponent(value)}; path=/; max-age=86400`;
};

const loadDraft = (gigId: string): { price: number | ""; message: string } | null => {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${DRAFT_COOKIE_PREFIX}${gigId}=`));
  if (match === undefined) return null;
  try {
    return JSON.parse(decodeURIComponent(match.split("=")[1])) as { price: number | ""; message: string };
  } catch {
    return null;
  }
};

const clearDraft = (gigId: string): void => {
  document.cookie = `${DRAFT_COOKIE_PREFIX}${gigId}=; path=/; max-age=0`;
};

export const AddOfferForm = ({
  gigId,
  submittedById,
  listerId,
  onAdded,
}: {
  gigId: string;
  submittedById: string;
  listerId: string;
  onAdded: () => void;
}): JSX.Element => {
  const [price, setPrice] = useState<number | "">("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: SubmitEvent): Promise<void> => {
    // prevent the browser's default full-page reload on form submit
    event.preventDefault();
    await fetch("http://localhost:1339/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ gigId, submittedById, listerId, price: price as number, message: message || undefined }),
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
