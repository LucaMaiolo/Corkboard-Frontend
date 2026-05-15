import { type JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Offer } from "../components/Offer";
import { OfferCard } from "../components/offerCard";

export const MyOffersPage = (): JSX.Element => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    void (async () => {
      const response = await fetch("http://localhost:1339/offers/myOffers", { credentials: "include" });
      if (response.ok) setOffers((await response.json()) as Offer[]);
    })();
  }, []);

  return (
    <div style={{ maxWidth: "720px", marginTop: "0", marginBottom: "0", marginLeft: "auto", marginRight: "auto", paddingTop: "48px", paddingBottom: "48px", paddingLeft: "24px", paddingRight: "24px" }}>
      <h1 style={{ marginBottom: "24px" }}>My Offers</h1>
      {offers.length === 0
        ? <p>You haven't submitted any offers yet.</p>
        : (
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {offers.map((offer) => (
              <li key={offer.id} onClick={() => void navigate(`/tasks/${offer.gigId}`)} style={{ cursor: "pointer" }}>
                <OfferCard offer={offer} />
              </li>
            ))}
          </ul>
        )
      }
    </div>
  );
};
