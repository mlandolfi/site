import React, { useCallback, useEffect } from "react";
import cx from "classnames";

import styles from "./Welcome.module.css";
import {
  handleForDeleteIntro,
  handleForIntro,
  handleForWIP,
  handleForRemoveAbout,
  handleForWelcomeBanner,
  handleForWriteAbout,
} from "./handlers";

export const Welcome = (): JSX.Element => {
  const lastScroll = React.useRef(0);

  const scrollHandler = useCallback(() => {
    const currentScroll = window.scrollY;
    handleForWelcomeBanner(currentScroll, lastScroll.current);
    handleForIntro(currentScroll, lastScroll.current);
    handleForDeleteIntro(currentScroll, lastScroll.current);
    handleForWriteAbout(currentScroll, lastScroll.current);
    handleForRemoveAbout(currentScroll, lastScroll.current);
    handleForWIP(currentScroll, lastScroll.current);
    lastScroll.current = currentScroll;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [scrollHandler]);

  return (
    <div className={styles.root}>
      <div className={styles.bannerContainer}>
        <span
          className={cx(styles.welcomeBanner, styles.banner)}
          id="welcome-banner"
        >
          Welcome
        </span>
        <span
          className={cx(styles.introBanner, styles.banner)}
          id="intro-banner"
        >
          I'm Mike
        </span>
        <span className={cx(styles.wipBanner, styles.banner)} id="wip-banner">
          It's still a work in progress...
        </span>
      </div>
    </div>
  );
};
