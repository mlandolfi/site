import React, { useState } from "react";

import Particles from "../../containers/Particles";
import StyleBank from "../../containers/StyleBank";

import "./styles.css";
import { Tent } from "../../views/Tent/Tent";

export default function PlaygroundWrapper(props) {
  const [tab, setTab] = useState("bank");

  const TABS = ["Particles", "StyleBank", "Tent"];

  const changeTab = (tab) => (event) => {
    setTab(tab);
  };

  const renderTab = () => {
    switch (tab) {
      case "Particles":
        return <Particles />;
      case "StyleBank":
        return <StyleBank />;
      case "Tent":
        return <Tent />;
      default:
        return <Particles />;
    }
  };

  return (
    <div className="pw-root">
      <div className="pw-menu">
        <div className="pw-menu-divider" />
        {TABS.map((tab) => (
          <p className="pw-tab" key={`pw-tab-${tab}`} onClick={changeTab(tab)}>
            {tab}
          </p>
        ))}
      </div>
      {renderTab()}
    </div>
  );
}
