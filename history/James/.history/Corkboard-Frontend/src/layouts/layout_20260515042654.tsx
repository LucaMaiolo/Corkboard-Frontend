import type { JSX } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/footer";
export function Layout(): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Toaster />
      <Navbar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
