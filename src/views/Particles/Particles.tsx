import { useEffect, useState, useRef, useCallback } from "react";

import styles from "./Particles.module.css";

import POB from "./POB";

export const Particles = () => {
  const [numParticles, setNumParticles] = useState(200);
  const [minR, setMinR] = useState(4);
  const [maxR, setMaxR] = useState(8);
  const [lineDist, setLineDist] = useState(150);
  const [drawLines, setDrawLines] = useState(true);

  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<POB[]>([]);
  const interval = useRef<any | null>(null);

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
    if (!drawLines) return;
    // now to draw the lines between them

    particles.current.forEach((outer) => {
      particles.current.forEach((inner) => {
        if (!context.current) {
          return;
        }
        const pointDist = Math.sqrt(
          Math.pow(outer.x - inner.x, 2) + Math.pow(outer.y - inner.y, 2)
        );
        if (
          pointDist < lineDist &&
          !(outer.x === inner.x && outer.y === inner.y)
        ) {
          context.current.strokeStyle = `rgba(34, 162, 159, ${
            1 - pointDist / lineDist
          })`;
          context.current.beginPath();
          context.current.moveTo(outer.x, outer.y);
          context.current.lineTo(inner.x, inner.y);
          context.current.stroke();
          context.current.closePath();
        }
      });
    });
  }, [drawLines, lineDist]);

  useEffect(() => {
    const canvas = document.getElementById(
      "particles-canvas-root"
    ) as HTMLCanvasElement;
    context.current = canvas.getContext("2d");
    if (!context.current) return;

    context.current.fillStyle = "#000";
    particles.current = [];
    for (let i = 0; i < numParticles; i++) {
      const temp = new POB(
        window.innerWidth,
        window.innerHeight,
        maxR,
        minR,
        0.2,
        lineDist
      );
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
  }, [maxR, minR, lineDist, numParticles, onInterval]);

  return (
    <div className={styles.root}>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        id="particles-canvas-root"
      />
      <div className={styles.version}>v1.0</div>
    </div>
  );
};
