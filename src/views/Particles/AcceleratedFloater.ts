import { getRandomBetween } from "../../utils";
import { Acceleration, Particle, Position, emptyVector } from "./types";

export class AcceleratedFloater extends Particle {
  boardWidth: number;
  boardHeight: number;
  boardPadding: number;
  acceleration: Acceleration = { ...emptyVector };

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
      getRandomBetween(1, 1.2) *
      (Math.random() < 0.5 ? 1 : -1) *
      this.velocityMultiplier;
    this.velocity.y =
      getRandomBetween(1, 1.2) *
      (Math.random() < 0.5 ? 1 : -1) *
      this.velocityMultiplier;

    this.acceleration.y = 0.01;

    this.pos.x = Math.floor(Math.random() * (this.boardWidth - 0 + 1)) + 0;
    this.pos.y = Math.floor(Math.random() * (this.boardHeight - 0 + 1)) + 0;

    if (!smooth) return;

    this.pos.y =
      this.velocity.y > 0
        ? -1 * this.boardPadding
        : this.boardHeight + this.boardPadding;
  }

  moveAndGet(): Position {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.velocity.z += this.acceleration.z;

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
