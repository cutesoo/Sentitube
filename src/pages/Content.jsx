import React from "react";
import Header from "../component/Header";
import Main from "../component/Main";
import { useState } from "react";

export default function Content() {
  const [onMenu, setOnMenu] = useState(true);

  return (
    <>
      <Header onMenu={onMenu} setOnMenu={setOnMenu} />
      <Main onMenu={onMenu} />
    </>
  );
}
