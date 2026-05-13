import type { JSX } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/footer";
export function Layout(): JSX.Element {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
