import { type JSX, type SubmitEvent, useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const priceRef = useRef<number | "">(price);
  const messageRef = useRef<string>(message);

  // restore draft on mount
  useEffect(() => {
    const draft = loadDraft(gigId);
    if (draft !== null) {
      setPrice(draft.price);
      setMessage(draft.message);
      priceRef.current = draft.price;
      messageRef.current = draft.message;
    }
  }, [gigId]);

  const scheduleSave = (): void => {
    if (timerRef.current !== null) return;
    timerRef.current = setTimeout(() => {
      saveDraft(gigId, priceRef.current, messageRef.current);
      timerRef.current = null;
      toast.success("Draft saved");
    }, DEBOUNCE_MS);
  };

  const handleSubmit = async (event: SubmitEvent): Promise<void> => {
    // prevent the browser's default full-page reload on form submit
    event.preventDefault();
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const response = await fetch("http://localhost:1339/offers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ gigId, submittedById, listerId, price: price as number, message: message || undefined }),
    });
    if (!response.ok) {
      toast.error(await response.text());
      return;
    }
    clearDraft(gigId);
    setPrice("");
    setMessage("");
    priceRef.current = "";
    messageRef.current = "";
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
          onChange={(event) => {
            const next = Number(event.target.value);
            setPrice(next);
            priceRef.current = next;
            scheduleSave();
          }}
          required
        />
      </label>

      <label>
        Message (optional)
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(event) => {
            const next = event.target.value;
            setMessage(next);
            messageRef.current = next;
            scheduleSave();
          }}
        />
      </label>

      <button type="submit">Submit Offer</button>
    </form>
  );
};
