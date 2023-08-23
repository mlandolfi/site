import { getRandomBetween } from "../../utils";
import { Particle, Position } from "./types";

const maxVX = 0.8;
const maxVY = 0.8;

export class RepelledFloater extends Particle {
  boardWidth: number;
  boardHeight: number;
  boardPadding: number;
  originalVX?: number;
  originalVY?: number;

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
    this.originalVX = this.vx;
    this.originalVY = this.vy;

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

    // slow it down if it's going too fast
    if (Math.abs(this.vx) > Math.abs(this.originalVX ?? maxVX)) {
      this.vx *= 0.99;
    }
    if (Math.abs(this.vy) > Math.abs(this.originalVY ?? maxVY)) {
      this.vy *= 0.99;
    }

    if (
      this.x > this.boardWidth + this.boardPadding ||
      this.x < -1 * this.radius
    ) {
      this.vx *= -1;
    } else if (
      this.y > this.boardHeight + this.boardPadding ||
      this.y < -1 * this.radius
    ) {
      this.vy *= -1;
    }
    return { x: Math.ceil(this.x), y: Math.ceil(this.y) };
  }

  reactToMouse(mousePos: Position) {
    const dx = mousePos.x - this.x;
    const dy = mousePos.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const force = (75 - dist) / 75;

    if (dist < 75) {
      this.vx -= (dx / dist) * force;
      this.vy -= (dy / dist) * force;
    }
  }
}

export const createRepelledFloater = ({
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
  radius?: number;
}) => {
  return new RepelledFloater({
    boardWidth,
    boardHeight,
    maxR,
    minR,
    velocityMultiplier,
    boardPadding,
  });
};
