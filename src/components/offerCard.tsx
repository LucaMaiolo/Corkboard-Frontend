import type { JSX } from "react";
import type { Offer } from "./Offer.js";

export const OfferCard = ({
  offer,
  onAccept,
  onDecline,
}: {
  offer: Offer;
  onAccept?: () => void;
  onDecline?: () => void;
}): JSX.Element => (
  <div className="card">
    <div className="card-top">
      <p className="card-title">${offer.price}</p>
      <span className="card-status">{offer.status}</span>
    </div>
    {offer.message && <p className="card-description">{offer.message}</p>}
    <p className="card-meta">{offer.submittedById}</p>
    {onAccept && <button onClick={onAccept}>Accept</button>}
    {onDecline && <button onClick={onDecline}>Decline</button>}
  </div>
);
