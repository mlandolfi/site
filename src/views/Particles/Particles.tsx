import { useEffect, useState, useRef, useCallback } from "react";

import styles from "./Particles.module.css";

import { createFloater, drawLines, drawTriangles, Floater } from "./Floater";
import { getRandomBetween } from "../../utils";

export const Particles = () => {
  const [numParticles, setNumParticles] = useState(100);
  const [minR, setMinR] = useState(4);
  const [maxR, setMaxR] = useState(8);

  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Floater[]>([]);
  const interval = useRef<any | null>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const onInterval = useCallback(() => {
    if (!Object.isExtensible(context.current)) {
      return;
    }
    if (!context.current) {
      return;
    }

    requestAnimationFrame(onInterval);
    // clearing the canvas
    context.current.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // drawing the particles themselves
    context.current.fillStyle = "#22A29F";
    particles.current.forEach((bp) => {
      if (!context.current) {
        return;
      }
      context.current.beginPath();
      const [x, y] = bp.moveAndGet();
      context.current.arc(x, y, bp.radius, 0, 2 * Math.PI);
      context.current.closePath();

      // this.context.fillStyle = `rgba(255, 255, 255, ${bp.radius / this.state.maxR})`
      context.current.fill();
    });
    // now to draw the lines between them
    const lines = drawLines({
      context: context.current,
      particles: particles.current,
      // mousePos: mousePos.current,
    });

    // drawTriangles({
    //   context: context.current,
    //   particles: particles.current,
    //   mousePos: mousePos.current,
    //   lines,
    // });
  }, []);

  useEffect(() => {
    const canvas = document.getElementById(
      "particles-canvas-root"
    ) as HTMLCanvasElement;
    context.current = canvas.getContext("2d");
    if (!context.current) return;

    context.current.fillStyle = "#000";
    particles.current = [];
    for (let i = 0; i < numParticles; i++) {
      const temp = createFloater({
        boardWidth: window.innerWidth,
        boardHeight: window.innerHeight,
        maxR,
        minR,
        velocityMultiplier: 0.2,
        boardPadding: 150, // lineDist
      });
      context.current.beginPath();
      const [x, y] = temp.moveAndGet();
      context.current.arc(x, y, temp.radius, 0, 2 * Math.PI);
      context.current.closePath();
      context.current.fill();
      particles.current.push(temp);
    }

    interval.current = window.requestAnimationFrame(onInterval);

    return () => {
      clearInterval(interval.current);
    };
  }, [maxR, minR, numParticles, onInterval]);

  // set an on mouse move event listener
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className={styles.root}>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        id="particles-canvas-root"
      />
      <div className={styles.controls}>
        <button className="t-button">hello</button>
      </div>
      <div className={styles.version}>v1.0</div>
    </div>
  );
};
