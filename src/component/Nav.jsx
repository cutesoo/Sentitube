import React from "react";
import Menu from "./Menu";
import { TiHome } from "react-icons/ti";
import { IoMdSettings } from "react-icons/io";
import { SiGoogleanalytics } from "react-icons/si";
import { MdHistory } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoIosHelpCircle } from "react-icons/io";

export default function Nav({ activeMenu, setActiveMenu }) {
  // Toggle menu aktif saat button diklik
  return (
    <div>
      <div className="nav">
        {/* Home */}
        <button
          onClick={() => setActiveMenu("Home")}
          aria-pressed={activeMenu === "Home"}
          className="button-menu"
        >
          <Menu
            icon={<TiHome />}
            menu="Home"
            isActive={activeMenu === "Home"}
          />
        </button>

        {/* Analysis */}
        <button
          onClick={() => setActiveMenu("Analysis")}
          aria-pressed={activeMenu === "Analysis"}
          className="button-menu"
        >
          <Menu
            icon={<SiGoogleanalytics />}
            menu="Analysis"
            isActive={activeMenu === "Analysis"}
          />
        </button>

        <button
          onClick={() => setActiveMenu("History")}
          aria-pressed={activeMenu === "History"}
          className="button-menu"
        >
          <Menu
            icon={<MdHistory />}
            menu="History"
            isActive={activeMenu === "History"}
          />
        </button>
      </div>
    </div>
  );
}
