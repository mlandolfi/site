import { useEffect, useState, useRef, useCallback } from "react";
import cx from "classnames";

import styles from "./Particles.module.css";

import { drawLines, Floater, LINE_DIST } from "./Floater";
import { RepelledFloater } from "./RepelledFloater";
import { throttleFn } from "../../utils";
import { emptyVector, Position } from "./types";
import { AcceleratedFloater } from "./AcceleratedFloater";

const getNumParticles = (density: number) => {
  return Math.floor(window.innerWidth * window.innerHeight * density);
};

enum Tab {
  Connected = "connected",
  Repelled = "repelled",
  Accelerated = "accelerated",
}
const Tabs = [
  {
    label: "Connected",
    value: Tab.Connected,
    particle: Floater,
    withLines: true,
    particleDensity: 0.0003,
    boardPadding: LINE_DIST,
  },
  {
    label: "Repelled",
    value: Tab.Repelled,
    particle: RepelledFloater,
    withLines: false,
    particleDensity: 0.001,
  },
  {
    label: "Accelerated",
    value: Tab.Accelerated,
    particle: AcceleratedFloater,
    withLines: false,
    particleDensity: 0.0005,
  },
];

export const Particles = () => {
  const [minR, setMinR] = useState(0);
  const [maxR, setMaxR] = useState(4);
  const [tab, setTab] = useState(Tabs[2]);
  const [context, setContext] = useState<null | CanvasRenderingContext2D>(null);

  const particles = useRef<Array<Floater | RepelledFloater>>([]);
  const interval = useRef<any | null>(null);
  const mousePos = useRef<Position>({ ...emptyVector });

  const onInterval = useCallback(() => {
    if (!context) {
      return;
    }

    interval.current = requestAnimationFrame(onInterval);
    // clearing the canvas
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // drawing the particles themselves
    context.fillStyle = "#22A29F";

    particles.current.forEach((bp) => {
      if (!context) {
        return;
      }
      bp.moveAndGet();
      bp.draw(context);
    });

    // now to draw the lines between them
    if (tab.withLines) {
      drawLines({
        context: context,
        particles: particles.current,
      });
    }
  }, [tab, context]);

  useEffect(() => {
    const canvas = document.getElementById(
      "particles-canvas-root"
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setContext(ctx);
  }, []);

  useEffect(() => {
    if (!context) {
      return;
    }

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.current.length = 0;
    for (let i = 0; i < getNumParticles(tab.particleDensity); i++) {
      const temp = new tab.particle({
        boardWidth: window.innerWidth,
        boardHeight: window.innerHeight,
        maxR,
        minR,
        velocityMultiplier: 0.1,
        boardPadding: tab.boardPadding ?? maxR,
      });
      temp.moveAndGet();
      temp.draw(context);
      particles.current.push(temp);
    }

    interval.current = window.requestAnimationFrame(onInterval);

    return () => {
      window.cancelAnimationFrame(interval.current);
    };
  }, [maxR, minR, onInterval, tab, context]);

  // set an on mouse move event listener
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      particles.current.forEach((p) => {
        if (p instanceof RepelledFloater && context) {
          p.reactToMouse(mousePos.current);
        }
      });
    };
    const throttledOnMouseMove = throttleFn(onMouseMove, 5);
    window.addEventListener("mousemove", throttledOnMouseMove);
    return () => {
      window.removeEventListener("mousemove", throttledOnMouseMove);
    };
  }, [context]);

  return (
    <div className={styles.root}>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        id="particles-canvas-root"
      />
      <div className={styles.controls}>
        <button
          onClick={() => {
            particles.current.length = 0;
            setTab(Tabs[0]);
          }}
          className={cx(
            styles.button,
            tab.value === Tab.Connected && styles.selected
          )}
        >
          Connected
        </button>
        <button
          onClick={() => {
            particles.current.length = 0;
            setTab(Tabs[1]);
          }}
          className={cx(
            styles.button,
            tab.value === Tab.Repelled && styles.selected
          )}
        >
          Repelled
        </button>
        <button
          onClick={() => {
            particles.current.length = 0;
            setTab(Tabs[2]);
          }}
          className={cx(
            styles.button,
            tab.value === Tab.Accelerated && styles.selected
          )}
        >
          Accelerated
        </button>
      </div>
      <div className={styles.version}>v2.0</div>
    </div>
  );
};
