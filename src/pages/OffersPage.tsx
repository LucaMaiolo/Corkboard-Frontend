import { type JSX, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OfferList } from "../components/offerList";
import { AddOfferForm } from "../components/addOfferForm";
import type { Task } from "../components/Task";

export const OffersPage = (): JSX.Element => {
  const { gigId } = useParams<{ gigId: string }>();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (gigId === undefined) void navigate("/");
  }, [gigId, navigate]);

  useEffect(() => {
    void fetch("http://localhost:1339/session/current", { credentials: "include" })
      .then((response) => response.json() as Promise<{ username: string }>)
      .then((data) => setCurrentUser(data.username));
  }, []);

  useEffect(() => {
    if (gigId === undefined) return;
    void fetch(`http://localhost:1339/tasks/id/${gigId}`)
      .then((response) => response.json() as Promise<Task>)
      .then(setTask);
  }, [gigId]);

  if (gigId === undefined) return <></>;

  return (
    <>
      <h1>Offers</h1>
      {currentUser !== null && task !== null && currentUser !== task.listerId && (
        <AddOfferForm
          gigId={gigId}
          submittedById={currentUser}
          listerId={task.listerId}
          onAdded={() => setRefreshKey((key) => key + 1)}
        />
      )}
      <OfferList gigId={gigId} refreshKey={refreshKey} currentUser={currentUser} />
    </>
  );
};
