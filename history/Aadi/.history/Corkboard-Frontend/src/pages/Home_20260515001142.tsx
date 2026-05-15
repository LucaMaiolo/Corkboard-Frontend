import type { JSX } from "react";
import { Link } from "react-router-dom";
/** Main components for our home page */
export function Home(): JSX.Element {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 56px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px",
        background: "#f7f5f2",
      }}
    >
      <div style={{ maxWidth: 560, textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#e27002",
            marginBottom: "16px",
          }}
        >
          Welcome to Corkboard
        </span>

        <h1
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "48px",
            fontWeight: 400,
            lineHeight: 1.15,
            color: "#1a1714",
            margin: "0 0 20px 0",
          }}
        >
          Get things done,
          <br />
          together.
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#777",
            lineHeight: 1.7,
            margin: "0 0 36px 0",
          }}
        >
          Post tasks, find help, and get things done in your community. Browse
          available tasks or post your own in minutes.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link
            to="/all-tasks"
            style={{
              padding: "12px 28px",
              background: "#e27002",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "14px",
              transition: "background 0.15s",
            }}
          >
            Browse Tasks
          </Link>
          <Link
            to="/create"
            style={{
              padding: "12px 28px",
              background: "#fff",
              color: "#1a1714",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "14px",
              border: "1.5px solid #e8e4df",
            }}
          >
            Post a Task
          </Link>
        </div>
      </div>
    </div>
  );
}
