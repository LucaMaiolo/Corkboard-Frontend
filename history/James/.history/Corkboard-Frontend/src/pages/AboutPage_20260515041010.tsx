import type { JSX } from "react";

const team = [
  {
    name: "Luca Maiolo",
    role: "Frontend and Users",
    bio: "Designed the look and feel of the app, wrote the users system.",
  },
  {
    name: "Aadi Padhiar",
    role: "Leadership and Tasks",
    bio: "Kept the team on track, wrote the tasks system.",
  },
  {
    name: "James Haring",
    role: "Backend and Offers",
    bio: "Set up and handled the project, wrote the offers system.",
  },
];

export const AboutPage = (): JSX.Element => (
  <div style={{ maxWidth: "900px", marginTop: "0", marginBottom: "0", marginLeft: "auto", marginRight: "auto", paddingTop: "56px", paddingBottom: "56px", paddingLeft: "24px", paddingRight: "24px" }}>
    <span
      style={{
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "hsl(30, 100%, 50%)",
      }}
    >
      About Us
    </span>

    <h1
      style={{
        fontFamily: "serif",
        fontSize: "40px",
        color: "hsl(30, 25%, 25%)",
        marginTop: "12px",
        marginBottom: "20px",
        marginLeft: "0",
        marginRight: "0",
      }}
    >
      Built by students, for the community.
    </h1>

    <p style={{ fontSize: "16px", color: "hsl(0, 0%, 25%)", lineHeight: 1.8, marginBottom: "16px" }}>
      CorkBoard is a task marketplace that allows people who need help with everyday tasks connect to local freelancers willing to complete them, for an agreed-upon price.
    </p>
    <p style={{ fontSize: "16px", color: "hsl(0, 0%, 25%)", lineHeight: 1.8, marginBottom: "48px" }}>
      The name is in reference to physical cork bulletin boards found in schools, offices, community centers, and elsewhere, a nod to the early medium of networking.
    </p>

    <h2
      style={{ fontSize: "12px", color: "hsl(0, 0%, 50%)", marginBottom: "24px" }}
    >
      The Team
    </h2>

  </div>
);
