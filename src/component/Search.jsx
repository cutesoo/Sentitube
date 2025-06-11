import React from "react";
import { CiSearch } from "react-icons/ci";

export default function Search() {
  return (
    <div className="menu-style">
      <div className="search">
        <CiSearch className="icon" />

        <input className="input-style" type="text" placeholder="Search" />
      </div>
    </div>
  );
}
