import { useEffect, useState, useRef, useCallback } from "react";
import cx from "classnames";

import styles from "./Particles.module.css";

import { Floater } from "./Floater";
import { RepelledFloater } from "./RepelledFloater";
import { throttleFn } from "../../utils";
import { AcceleratedFloater } from "./AcceleratedFloater";
import { Board } from "./Board";

const getParticleDensity = ({
  mouseRepel,
  accelerate,
  drawLines,
}: {
  mouseRepel: boolean;
  accelerate: boolean;
  drawLines: boolean;
}) => {
  if (drawLines) {
    return 0.0003;
  }
  if (mouseRepel) {
    return 0.001;
  }
  if (accelerate) {
    return 0.0003;
  }
  return 0.0003;
};

export const Particles = () => {
  const [context, setContext] = useState<null | CanvasRenderingContext2D>(null);

  const [drawLines, setDrawLines] = useState(false);
  const [mouseRepel, setMouseRepel] = useState(false);
  const [accelerate, setAccelerate] = useState(false);
  const [maxR, setMaxR] = useState(4);

  const interval = useRef<any | null>(null);
  const board = useRef<Board | null>(null);

  const onInterval = useCallback(() => {
    if (!context) {
      return;
    }

    interval.current = requestAnimationFrame(onInterval);

    board.current?.moveParticles();
    board.current?.prepareBoardForRedraw();
    board.current?.drawParticles();

    // now to draw the lines between them
    if (drawLines) {
      board.current?.drawConnectingLines();
    }
  }, [drawLines, context]);

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

    let pc = Floater;
    if (mouseRepel) {
      pc = RepelledFloater;
    } else if (accelerate) {
      pc = AcceleratedFloater;
    }

    board.current = new Board({
      width: window.innerWidth,
      height: window.innerHeight,
      padding: 50,
      particleConstructor: pc,
      context,
      particleDensity: getParticleDensity({
        mouseRepel,
        accelerate,
        drawLines,
      }),
      maxR,
    });
    board.current.generateParticles();
    board.current.moveParticles();
    board.current.prepareBoardForRedraw();
    board.current.drawParticles();

    interval.current = window.requestAnimationFrame(onInterval);

    return () => {
      window.cancelAnimationFrame(interval.current);
    };
  }, [onInterval, context, mouseRepel, accelerate, drawLines, maxR]);

  // set an on mouse move event listener
  useEffect(() => {
    if (!mouseRepel) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      board.current?.onMouseMove(e.clientX, e.clientY);
    };
    const throttledOnMouseMove = throttleFn(onMouseMove, 5);
    window.addEventListener("mousemove", throttledOnMouseMove);
    return () => {
      window.removeEventListener("mousemove", throttledOnMouseMove);
    };
  }, [context, mouseRepel]);

  return (
    <div className={styles.root}>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        id="particles-canvas-root"
      />
      <div className={styles.controls}>
        <div className={styles.controlOptionsContainer}>
          <button
            onClick={() => {
              setDrawLines(!drawLines);
            }}
            className={cx(styles.button, drawLines && styles.selected)}
          >
            Lines
          </button>
          <button
            onClick={() => {
              setAccelerate(false);
              setMouseRepel(!mouseRepel);
            }}
            className={cx(styles.button, mouseRepel && styles.selected)}
          >
            Repelled
          </button>
          <button
            onClick={() => {
              setMouseRepel(false);
              setAccelerate(!accelerate);
            }}
            className={cx(styles.button, accelerate && styles.selected)}
          >
            Accelerated
          </button>
        </div>
        {/* <div>
          <input
            type="range"
            value={maxR}
            min={1}
            max={24}
            className={styles.radiusSlider}
            onChange={(e) => setMaxR(parseInt(e.target.value))}
          />
        </div> */}
      </div>
      <div className={styles.version}>v3.0</div>
    </div>
  );
};
