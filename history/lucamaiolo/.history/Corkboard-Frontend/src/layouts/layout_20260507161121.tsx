import type { JSX } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/footer";
export function Layout(): JSX.Element {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
