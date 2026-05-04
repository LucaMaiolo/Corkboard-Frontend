import type { ReactNode, JSX } from "react";
import "./Card.css";

type CardProps = {
  title: string;
  description: string;
  location: string;
  pay: number;
  timeInMins: number;
  status: string;
};


export function Card({title, description, location, pay, timeInMins, status}: CardProps): JSX.Element {
  return(
    <div className="card">
      <div className="card-top">
        <p className="card-title">{title}</p>
        <span className="card-status">{status}</span>
      </div>
      <p className="card-description">{description}</p>
      <p className="card-meta">{location} . ${pay} . {timeInMins} mins</p>
    </div>
  );
}
