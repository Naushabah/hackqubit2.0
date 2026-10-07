import { NavLink } from "react-router-dom";
import OfflineBadge from "./OfflineBadge.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/tutor", label: "Tutor" },
  { to: "/quiz", label: "Quiz" },
  { to: "/notes", label: "Notes" },
  { to: "/ai-roadmap", label: "AI Plan" },
  { to: "/progress", label: "Progress" }
];

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <NavLink className="logo" to="/" aria-label="PathshalaAI home">
          <span className="logo-mark">P</span>
          <span>PathshalaAI</span>
        </NavLink>

        <div className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? "active" : undefined)}
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <OfflineBadge />
      </nav>
    </header>
  );
}
