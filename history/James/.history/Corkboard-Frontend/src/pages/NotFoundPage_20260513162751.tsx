import type { JSX } from "react";
import { useLocation } from "react-router-dom";

export const NotFoundPage = (): JSX.Element => {
  const { pathname } = useLocation();
  return (
    <>
      <h1>404</h1>
      <p>{pathname} not found</p>
    </>
  );
};
