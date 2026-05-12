import { type JSX, useState, useEffect } from "react";
import type { Offer } from "./Offer.js";
import { OfferCard } from "./offerCard";

const fetchOffers = async (gigId: string): Promise<Offer[]> => {
  const response = await fetch(`http://localhost:1339/offers?gigId=${gigId}`, {
    credentials: "include",
  });
  return response.json() as Promise<Offer[]>;
};

export const OfferList = ({ gigId, refreshKey }: { gigId: string; refreshKey?: number }): JSX.Element => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    void fetchOffers(gigId).then(setOffers);
  }, [gigId, version, refreshKey]);

  const handleAccept = async (id: string): Promise<void> => {
    await fetch(`http://localhost:1339/offers/${id}/accept`, { method: "PUT", credentials: "include" });
    setVersion((previous) => previous + 1);
  };

  const handleDecline = async (id: string): Promise<void> => {
    await fetch(`http://localhost:1339/offers/${id}/decline`, { method: "PUT", credentials: "include" });
    setVersion((previous) => previous + 1);
  };

  return (
    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
      {offers.map((offer) => (
        <li key={offer.id}>
          <OfferCard
            offer={offer}
            onAccept={() => void handleAccept(offer.id)}
            onDecline={() => void handleDecline(offer.id)}
          />
        </li>
      ))}
    </ul>
  );
};
