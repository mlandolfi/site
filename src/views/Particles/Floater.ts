import { getRandomBetween } from "../../utils";
import { Particle, Position } from "./types";

export class Floater extends Particle {
  boardWidth: number;
  boardHeight: number;
  boardPadding: number;

  constructor({
    boardWidth,
    boardHeight,
    maxR,
    minR,
    velocityMultiplier,
    boardPadding,
  }: {
    boardWidth: number;
    boardHeight: number;
    maxR: number;
    minR: number;
    velocityMultiplier: number;
    boardPadding: number;
  }) {
    super({
      maxR,
      minR,
      velocityMultiplier,
    });

    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;

    // this is how far particles outside the board can go before being destroyed
    this.boardPadding = boardPadding;

    this.generate();
  }

  generate(smooth = false) {
    this.radius =
      Math.floor(Math.random() * (this.maxR - this.minR + 1)) + this.minR;

    this.vz =
      getRandomBetween(0, 0.02) *
      (Math.random() < 0.5 ? 1 : -1) *
      this.velocityMultiplier;

    this.vx =
      getRandomBetween(0.5, 0.8) *
      (Math.random() < 0.5 ? 1 : -1) *
      this.velocityMultiplier;
    this.vy =
      getRandomBetween(0.5, 0.8) *
      (Math.random() < 0.5 ? 1 : -1) *
      this.velocityMultiplier;
    // this.vx = Math.random() < 0.5 ? 1 : -1;
    // this.vy = Math.random() < 0.5 ? 1 : -1;

    this.x = Math.floor(Math.random() * (this.boardWidth - 0 + 1)) + 0;
    this.y = Math.floor(Math.random() * (this.boardHeight - 0 + 1)) + 0;

    if (!smooth) return;

    if (Math.random() < 0.5)
      this.x =
        this.vx > 0
          ? -1 * this.boardPadding
          : this.boardWidth + this.boardPadding;
    else
      this.y =
        this.vy > 0
          ? -1 * this.boardPadding
          : this.boardHeight + this.boardPadding;
  }

  // ---|--- z, 0 < r < 8, midpoint 4 z=0

  moveAndGet(): Position {
    this.x += this.vx;
    this.y += this.vy;

    this.radius += this.vz;
    this.radius = Math.max(this.radius, 0);
    if (this.radius === 0) {
      this.generate(true);
    } else if (this.radius > this.maxR) {
      this.vz *= -1;
    }

    if (
      this.x > this.boardWidth + this.boardPadding ||
      this.x < -1 * this.boardPadding
    ) {
      this.generate(true);
    } else if (
      this.y > this.boardHeight + this.boardPadding ||
      this.y < -1 * this.boardPadding
    ) {
      this.generate(true);
    }
    return { x: Math.ceil(this.x), y: Math.ceil(this.y) };
  }
}

export const LINE_DIST = 150;
export const drawLines = ({
  particles,
  context,
}: {
  particles: Floater[];
  context: CanvasRenderingContext2D;
  mousePos?: { x: number; y: number };
}): Array<number[]> => {
  const lines: Array<number[]> = [];

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length - 1; j++) {
      const outer = particles[i];
      const inner = particles[j];

      if (!context) {
        continue;
      }
      if (outer.radius === 0 || inner.radius === 0) {
        continue;
      }

      const pointDist = Math.sqrt(
        Math.pow(outer.x - inner.x, 2) +
          Math.pow(outer.y - inner.y, 2) +
          Math.pow(outer.radius - inner.radius, 2)
      );
      if (
        pointDist < LINE_DIST &&
        !(outer.x === inner.x && outer.y === inner.y)
      ) {
        lines.push([outer.id, inner.id]);
        context.strokeStyle = `rgba(34, 162, 159, ${
          1 - pointDist / LINE_DIST
        })`;
        context.beginPath();
        context.moveTo(outer.x, outer.y);
        context.lineTo(inner.x, inner.y);
        context.stroke();
        context.closePath();
      }
    }
  }

  return lines;
};

export const drawTriangles = ({
  particles,
  context,
  mousePos,
  lines,
}: {
  particles: Floater[];
  context: CanvasRenderingContext2D;
  mousePos: { x: number; y: number };
  lines: Array<number[]>;
}) => {
  const linesDict: Record<number, number[]> = {};
  lines.forEach(([id1, id2]) => {
    if (!linesDict[id1]) {
      linesDict[id1] = [id2];
    } else {
      linesDict[id1].push(id2);
    }
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length - 1; j++) {
      const outer = particles[i];
      const inner = particles[j];

      if (!context) {
        continue;
      }

      context.fillStyle = `rgba(34, 162, 159, 0.4)`;
      linesDict[outer.id]?.forEach((id) => {
        if (linesDict[inner.id].includes(id)) {
          context.beginPath();
          context.moveTo(outer.x, outer.y);
          context.lineTo(inner.x, inner.y);
          context.lineTo(
            particles.find((p) => p.id === id)!.x,
            particles.find((p) => p.id === id)!.y
          );
          context.fill();
          context.closePath();
        }
      });
    }
  }
};
