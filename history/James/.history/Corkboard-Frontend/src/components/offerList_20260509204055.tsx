import { type JSX, useState, useEffect } from "react";
import type { Offer } from "./Offer.js";
import { OfferCard } from "./offerCard";

const fetchOffers = async (gigId: string): Promise<Offer[]> => {
  const response = await fetch(`http://localhost:1339/offers?gigId=${gigId}`, {
    credentials: "include",
  });
  return response.json() as Promise<Offer[]>;
};

export const OfferList = ({ gigId }: { gigId: string }): JSX.Element => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    void fetchOffers(gigId).then(setOffers);
  }, [gigId]);

  return (
    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
      {offers.map((offer) => (
        <li key={offer.id}>
          <OfferCard offer={offer} />
        </li>
      ))}
    </ul>
  );
};
