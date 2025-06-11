import Nav from "./Nav";
import { useState } from "react";
import Home from "./Home";
import Analysis from "./Analysis";
import Trend from "./trend";
import History from "./History";

export default function Main({ onMenu}) {
  const [activeMenu, setActiveMenu] = useState("Home");

  return (
    <div className="container">
      {onMenu && (
        <div className="left">
          <Nav
            onMenu={onMenu}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
          />
        </div>
      )}

      <div className="right">        
        {activeMenu === "Home" && <Home />}
        {activeMenu === "Analysis" && <Analysis />}
         {activeMenu === "Trend" && <Trend />}
          {activeMenu === "History" && <History />}
      </div>
    </div>
  );
}
