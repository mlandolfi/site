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
    this.originalVX = this.velocity.x;
    this.originalVY = this.velocity.y;

    this.pos.x = Math.floor(Math.random() * (this.boardWidth - 0 + 1)) + 0;
    this.pos.y = Math.floor(Math.random() * (this.boardHeight - 0 + 1)) + 0;

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

    // slow it down if it's going too fast
    if (Math.abs(this.velocity.x) > Math.abs(this.originalVX ?? maxVX)) {
      this.velocity.x *= 0.99;
    }
    if (Math.abs(this.velocity.y) > Math.abs(this.originalVY ?? maxVY)) {
      this.velocity.y *= 0.99;
    }

    if (
      this.pos.x > this.boardWidth + this.boardPadding ||
      this.pos.x < -1 * this.pos.z
    ) {
      this.velocity.x *= -1;
    } else if (
      this.pos.y > this.boardHeight + this.boardPadding ||
      this.pos.y < -1 * this.pos.z
    ) {
      this.velocity.y *= -1;
    }
    return {
      x: Math.ceil(this.pos.x),
      y: Math.ceil(this.pos.y),
      z: Math.ceil(this.pos.z),
    };
  }

  reactToMouse(mousePos: Position) {
    const dx = mousePos.x - this.pos.x;
    const dy = mousePos.y - this.pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const force = (75 - dist) / 75;

    if (dist < 75) {
      this.velocity.x -= (dx / dist) * force;
      this.velocity.y -= (dy / dist) * force;
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
