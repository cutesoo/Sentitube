import React from "react";

export default function Menu({ icon, menu, isActive }) {
  return (
    <div className={`menu-style ${isActive ? "active" : ""}`}>
      <span className="icon">{icon}</span>
      <span className="label">{menu}</span>
    </div>
  );
}


