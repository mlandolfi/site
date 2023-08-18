import React from "react";
import styles from "./Welcome.module.css";

export const Welcome = (): JSX.Element => {
  return (
    <div className={styles.root}>
      <h1 className={styles.header}>Welcome</h1>
    </div>
  );
};
