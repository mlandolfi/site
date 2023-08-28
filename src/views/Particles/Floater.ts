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
    this.pos.z =
      Math.floor(Math.random() * (this.maxR - this.minR + 1)) + this.minR;

    this.velocity.z =
      getRandomBetween(0, 0.02) *
      (Math.random() < 0.5 ? 1 : -1) *
      this.velocityMultiplier;

    this.velocity.x =
      getRandomBetween(0.5, 0.8) *
      (Math.random() < 0.5 ? 1 : -1) *
      this.velocityMultiplier;
    this.velocity.y =
      getRandomBetween(0.5, 0.8) *
      (Math.random() < 0.5 ? 1 : -1) *
      this.velocityMultiplier;
    // this.vx = Math.random() < 0.5 ? 1 : -1;
    // this.vy = Math.random() < 0.5 ? 1 : -1;

    this.pos.x = Math.floor(Math.random() * this.boardWidth);
    this.pos.y = Math.floor(Math.random() * this.boardHeight);

    if (!smooth) return;

    if (Math.random() < 0.5)
      this.pos.x =
        this.velocity.x > 0
          ? -1 * this.boardPadding
          : this.boardWidth + this.boardPadding;
    else
      this.pos.y =
        this.velocity.y > 0
          ? -1 * this.boardPadding
          : this.boardHeight + this.boardPadding;
  }

  // ---|--- z, 0 < r < 8, midpoint 4 z=0

  moveAndGet(): Position {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;

    this.pos.z += this.velocity.z;
    this.pos.z = Math.max(this.pos.z, 0);
    if (this.pos.z === 0) {
      this.generate(true);
    } else if (this.pos.z > this.maxR) {
      this.velocity.z *= -1;
    }

    if (
      this.pos.x > this.boardWidth + this.boardPadding ||
      this.pos.x < -1 * this.boardPadding
    ) {
      this.generate(true);
    } else if (
      this.pos.y > this.boardHeight + this.boardPadding ||
      this.pos.y < -1 * this.boardPadding
    ) {
      this.generate(true);
    }
    return {
      x: Math.ceil(this.pos.x),
      y: Math.ceil(this.pos.y),
      z: Math.ceil(this.pos.z),
    };
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
      if (outer.pos.z === 0 || inner.pos.z === 0) {
        continue;
      }

      const pointDist = Math.sqrt(
        Math.pow(outer.pos.x - inner.pos.x, 2) +
          Math.pow(outer.pos.y - inner.pos.y, 2) +
          Math.pow(outer.pos.z - inner.pos.z, 2)
      );
      if (
        pointDist < LINE_DIST &&
        !(outer.pos.x === inner.pos.x && outer.pos.y === inner.pos.y)
      ) {
        lines.push([outer.id, inner.id]);
        context.strokeStyle = `rgba(34, 162, 159, ${
          1 - pointDist / LINE_DIST
        })`;
        context.beginPath();
        context.moveTo(outer.pos.x, outer.pos.y);
        context.lineTo(inner.pos.x, inner.pos.y);
        context.stroke();
        context.closePath();
      }
    }
  }

  return lines;
};
