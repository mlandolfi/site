import React from "react";
import styles from "./Nav.module.css";
import { Link, useLocation } from "react-router-dom";

const PAGES = [
  { label: "Welcome", path: "/site" },
  { label: "Sandbox", path: "/site/sandbox" },
];

const PROJECTS = [
  { label: "Particles", path: "particles" },
  { label: "Style Bank", path: "style-bank" },
  { label: "Tent", path: "tent" },
];

export default function Nav({}: {}) {
  const { pathname } = useLocation();

  const navButtons = React.useMemo(
    () =>
      PAGES.map((p) => (
        <Link className={styles.toolbarLink} to={p.path}>
          {p.label}
        </Link>
      )),
    []
  );

  const sandboxButtons = React.useMemo(() => {
    if (pathname.includes("sandbox")) {
      return (
        <div className={styles.sandboxButtonsContainer}>
          {PROJECTS.map((p) => (
            <Link className={styles.toolbarLink} to={`/site/sandbox/${p.path}`}>
              {p.label}
            </Link>
          ))}
        </div>
      );
    }
    return null;
  }, [pathname]);

  return (
    <>
      <div className={styles.toolbar}>
        {navButtons}
        {sandboxButtons}
      </div>

      <svg style={{ height: 0, width: 0, position: "absolute" }}>
        <defs>
          <filter id="varying-blur" x="0" y="0" width="100%" height="100%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="60"
              edgeMode="duplicate"
              result="blur"
            />
            <feComponentTransfer in="blur" result="outBlur">
              <feFuncA type="table" tableValues="1 0"></feFuncA>
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="outBlur" operator="in" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
