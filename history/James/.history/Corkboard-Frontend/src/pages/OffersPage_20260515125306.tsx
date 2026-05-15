import { type JSX, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OfferList } from "../components/offerList";

export const OffersPage = (): JSX.Element => {
  const { gigId } = useParams<{ gigId: string }>();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    if (gigId === undefined) void navigate("/");
  }, [gigId, navigate]);

  useEffect(() => {
    void fetch("http://localhost:1339/session/current", { credentials: "include" })
      .then((response) => response.json() as Promise<{ username: string }>)
      .then((data) => setCurrentUser(data.username));
  }, []);

  if (gigId === undefined) return <></>;

  return (
    <div style={{ maxWidth: "720px", marginTop: "0", marginBottom: "0", marginLeft: "auto", marginRight: "auto", padding: "48px 24px" }}>
      <h1 style={{ fontFamily: "serif", fontSize: "40px", fontWeight: 400, color: "hsl(30, 25%, 25%)", marginBottom: "32px" }}>
        Offers
      </h1>
      <OfferList gigId={gigId} refreshKey={0} currentUser={currentUser} />
    </div>
  );
};
