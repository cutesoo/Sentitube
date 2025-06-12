import Nav from "./Nav";
import { useState } from "react";
import Home from "./Home";
import Analysis from "./Analysis";
import History from "./History";

export default function Main({
  onMenu,
  postLink,
  ResultAnalysis,
  searchVideo,
  videoResults,
  getResultById,
}) {
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
        {activeMenu === "Home" && (
          <Home searchVideo={searchVideo} videoResults={videoResults}  postLink={postLink} ResultAnalysis={ResultAnalysis} getResultById={getResultById} />
        )}
        {activeMenu === "Analysis" && (
          <Analysis postLink={postLink} ResultAnalysis={ResultAnalysis} />
        )}
        {/* {activeMenu === "Trend" && <Trend />} */}
        {activeMenu === "History" && <History />}
      </div>
    </div>
  );
}
