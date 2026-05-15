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
    void fetch(`http://localhost:1339/tasks/${gigId}`)
      .then((response) => response.json() as Promise<Task>)
      .then(setTask);
  }, [gigId]);

  if (gigId === undefined) return <></>;

  return (
    <div style={{ maxWidth: "720px", marginTop: "0", marginBottom: "0", marginLeft: "auto", marginRight: "auto", padding: "48px 24px" }}>
      <h1 style={{ fontFamily: "serif", fontSize: "40px", fontWeight: 400, color: "hsl(30, 25%, 25%)", marginBottom: "32px" }}>
        Offers
      </h1>
      {currentUser !== null && task !== null && currentUser !== task.listerId && (
        <div style={{ marginBottom: "32px", padding: "24px", borderWidth: "1px", borderStyle: "solid", borderColor: "hsl(30, 25%, 75%)", borderRadius: "10px", background: "hsl(0, 0%, 100%)" }}>
          <AddOfferForm
            gigId={gigId}
            submittedById={currentUser}
            listerId={task.listerId}
            onAdded={() => setRefreshKey((key) => key + 1)}
          />
        </div>
      )}
      <OfferList gigId={gigId} refreshKey={refreshKey} currentUser={currentUser} />
    </div>
  );
};
