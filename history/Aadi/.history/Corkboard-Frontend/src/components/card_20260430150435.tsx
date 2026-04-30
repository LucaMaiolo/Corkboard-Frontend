import type { ReactNode, JSX } from "react";
import "./Card.css";

export function Card({ children }: { children: ReactNode }): JSX.Element {
  return <div className="card">{children}</div>;
}
