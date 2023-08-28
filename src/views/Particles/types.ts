import { getRandomBetween } from "../../utils";

export interface Vector {
  x: number;
  y: number;
  z: number;
}

export type Position = Vector;
export type Velocity = Vector;
export type Acceleration = Vector;

export const emptyVector = { x: 0, y: 0, z: 0 };

export abstract class Particle {
  maxR: number;
  minR: number;
  velocityMultiplier: number;
  velocity: Velocity = { ...emptyVector };
  pos: Position = { ...emptyVector };
  id: number;

  constructor({
    maxR,
    minR,
    velocityMultiplier,
  }: {
    maxR: number;
    minR: number;
    velocityMultiplier: number;
  }) {
    this.maxR = maxR;
    this.minR = minR;

    this.velocityMultiplier = velocityMultiplier;

    this.id = getRandomBetween(0, 100000000, true);
  }

  // to be overriden
  generate(): void {}

  draw(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, Math.ceil(this.pos.z), 0, 2 * Math.PI);

    const gradient = context.createRadialGradient(
      this.pos.x,
      this.pos.y,
      0,
      this.pos.x,
      this.pos.y,
      this.pos.z
    );

    // gradient.addColorStop(0.1, "rgb(58, 245, 242)"); // The lightest point (almost white, for the highlight)
    gradient.addColorStop(0.4, "#22a29f"); // Base color of the sphere
    gradient.addColorStop(0.9, "rgba(24, 118, 116, 1)"); // Darker edge for the sphere

    context.fillStyle = gradient;
    context.fill();
    context.closePath();
  }
}
