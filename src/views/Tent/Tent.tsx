import { useState } from "react";
import styles from "./Tent.module.css";

export const Tent = (): JSX.Element => {
  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.root}>
      <div>Work in progress...</div>
      {/* <button className={styles["t-button"]}>hello</button>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className={styles["t-toggle"]}
      /> */}
    </div>
  );
};
