import type { JSX } from "react";
import type { Offer } from "./Offer.js";

export const OfferCard = ({ offer }: { offer: Offer }): JSX.Element => (
  <div className="card">
    <div className="card-top">
      <p className="card-title">${offer.price}</p>
      <span className="card-status">{offer.status}</span>
    </div>
    {offer.message && <p className="card-description">{offer.message}</p>}
    <p className="card-meta">{offer.submittedById}</p>
  </div>
);
