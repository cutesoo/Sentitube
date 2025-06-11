import React from "react";

export default function Menu({ icon, menu }) {
  return (
    <div className="menu-style">
      {icon}
      <h3>{menu}</h3>
    </div>
  );
}
