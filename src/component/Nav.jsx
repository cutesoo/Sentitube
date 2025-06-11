import React from "react";
import Menu from "./Menu";
import { CiSearch } from "react-icons/ci";
import { TiHome } from "react-icons/ti";
import { IoMdSettings } from "react-icons/io";
import { SiGoogleanalytics } from "react-icons/si";
import { MdHistory } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoIosHelpCircle } from "react-icons/io";


import Search from "./Search";

export default function Nav({ activeMenu, setActiveMenu }) {
  // Toggle menu aktif saat button diklik
  return (
    <div>
      <div className="nav">
        <Search />

        {/* Home */}
        <button
          onClick={() => setActiveMenu("Home")}
          aria-pressed={activeMenu === "Home"}
          className="button-menu"
        >
          <Menu icon={<TiHome />} menu="Home" isActive={activeMenu === "Home"} />
        </button>

        {/* Analysis */}
        <button
          onClick={() => setActiveMenu("Analysis")}
          aria-pressed={activeMenu === "Analysis"}
          className="button-menu"
        >
          <Menu icon={<SiGoogleanalytics />} menu="Analysis" isActive={activeMenu === "Analysis"} />
        </button>

        {/* Trend */}
        <button
          onClick={() => setActiveMenu("Trend")}
          aria-pressed={activeMenu === "Trend"}
          className="button-menu"
        >
          <Menu icon={<FaArrowTrendUp />} menu="Trend" isActive={activeMenu === "Trend"} />
        </button>

        {/* History */}
        <button
          onClick={() => setActiveMenu("History")}
          aria-pressed={activeMenu === "History"}
          className="button-menu"
        >
          <Menu icon={<MdHistory />} menu="History" isActive={activeMenu === "History"} />
        </button>

        {/* Setting */}
        <button
          onClick={() => setActiveMenu("Setting")}
          aria-pressed={activeMenu === "Setting"}
          className="button-menu"
        >
          <Menu icon={<IoMdSettings />} menu="Setting" isActive={activeMenu === "Setting"} />
        </button>

        {/* Help & Support */}
        <button
          onClick={() => setActiveMenu("Help & Support")}
          aria-pressed={activeMenu === "Help & Support"}
          className="button-menu"
        >
          <Menu icon={<IoIosHelpCircle />} menu="Help & Support" isActive={activeMenu === "Help & Support"} />
        </button>
      </div>
    </div>
  );
}
