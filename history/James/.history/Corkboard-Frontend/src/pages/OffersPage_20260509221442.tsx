import { type JSX, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OfferList } from "../components/offerList";
import { AddOfferForm } from "../components/addOfferForm";

export const OffersPage = (): JSX.Element => {
  const { gigId } = useParams<{ gigId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (gigId === undefined) void navigate("/");
  }, [gigId, navigate]);

  const [refreshKey, setRefreshKey] = useState(0);

  if (gigId === undefined) return <></>;

  return (
    <>
      <h1>Offers</h1>
      <AddOfferForm gigId={gigId} onAdded={() => setRefreshKey((key) => key + 1)} />
      <OfferList gigId={gigId} refreshKey={refreshKey} />
    </>
  );
};
