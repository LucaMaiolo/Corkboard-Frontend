import { type JSX, useEffect, useState } from "react";
import type { Offer } from "../components/Offer";
import { OfferCard } from "../components/offerCard";

export const MyOffersPage = (): JSX.Element => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    void (async () => {
      const response = await fetch("http://localhost:1339/offers/myOffers", { credentials: "include" });
      if (response.ok) setOffers((await response.json()) as Offer[]);
    })();
  }, []);

  return (
    <>
      <h1>My Offers</h1>
      {offers.length === 0
        ? <p>You haven't submitted any offers yet.</p>
        : (
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {offers.map((offer) => (
              <li key={offer.id}>
                <OfferCard offer={offer} />
              </li>
            ))}
          </ul>
        )
      }
    </>
  );
};
