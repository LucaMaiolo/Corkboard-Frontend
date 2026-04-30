import type { ReactNode, JSX } from "react";
import "./Card.css";

export function Card({
  children,
  image,
}: {
  children: ReactNode;
  image: string;
}): JSX.Element {
  return (
    <div className="card">
      {image && <img className="card-img" src={image} alt=""></img>}
      {children}
    </div>
  );
}
