import React from "react";
import { useParams } from "react-router-dom";

import { Particles } from "../Particles/Particles";
import StyleBank from "../../containers/StyleBank";
import { Tent } from "../../views/Tent/Tent";

import styles from "./Sandbox.module.css";

export default function Sandbox() {
  const { projectName } = useParams();

  const content = React.useMemo(() => {
    switch (projectName) {
      case "style-bank":
        return <StyleBank />;
      case "tent":
        return <Tent />;
      case "particles":
      default:
        return <Particles />;
    }
  }, [projectName]);

  return <div className={styles.root}>{content}</div>;
}
