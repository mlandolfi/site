import { getRandomBetween } from "../../utils";
import { Acceleration, Particle, Position, emptyVector } from "./types";
import { getOrbitalDynamics } from "./utils";

export class GravitationalFloater extends Particle {
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

  generate() {
    this.pos.z =
      Math.floor(Math.random() * (this.maxR - this.minR + 1)) + this.minR;

    this.pos.x = Math.floor(Math.random() * (this.boardWidth - 0 + 1)) + 0;
    this.pos.y = Math.floor(Math.random() * (this.boardHeight - 0 + 1)) + 0;

    this.velocity = getOrbitalDynamics(1, this.pos).velocity;
    this.acceleration = getOrbitalDynamics(1, this.pos).acceleration;
  }

  moveAndGet(): Position {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;

    this.pos.z += this.velocity.z;
    this.pos.z = Math.max(this.pos.z, 0);

    const { velocity: vChange, acceleration: aChange } = getOrbitalDynamics(
      1,
      this.pos
    );
    this.velocity = vChange;
    this.acceleration = aChange;

    if (this.pos.z === 0) {
      this.generate();
    } else if (this.pos.z > this.maxR) {
      this.velocity.z *= -1;
    }

    if (
      this.pos.x > this.boardWidth + this.boardPadding ||
      this.pos.x < -1 * this.boardPadding
    ) {
      this.generate();
    } else if (
      this.pos.y > this.boardHeight + this.boardPadding ||
      this.pos.y < -1 * this.boardPadding
    ) {
      this.generate();
    }
    return {
      x: Math.ceil(this.pos.x),
      y: Math.ceil(this.pos.y),
      z: Math.ceil(this.pos.z),
    };
  }
}
