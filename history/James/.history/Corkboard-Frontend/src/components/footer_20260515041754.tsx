import type { JSX } from "react";
import { Link } from "react-router-dom";

export const Footer = (): JSX.Element => (
  <footer
    style={{
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "hsl(30, 25%, 75%)",
      padding: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "12px",
      color: "hsl(0, 0%, 50%)",
    }}
  >
    <span>© {new Date().getFullYear()} Corkboard. Kid Named Finger®.</span>
    <Link to="/about" style={{ color: "hsl(0, 0%, 50%)", textDecoration: "none" }}>
      About Us
    </Link>
  </footer>
);
