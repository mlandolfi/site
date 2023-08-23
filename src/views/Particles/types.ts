import { getRandomBetween } from "../../utils";

export interface Position {
  x: number;
  y: number;
}

export abstract class Particle {
  maxR: number;
  minR: number;
  velocityMultiplier: number;
  radius: number = 1;
  vx: number = 1;
  vy: number = 1;
  vz: number = 1;
  x: number = 0;
  y: number = 0;
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
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    const gradient = context.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius
    );

    // gradient.addColorStop(0.1, "rgb(58, 245, 242)"); // The lightest point (almost white, for the highlight)
    gradient.addColorStop(0.4, "#22a29f"); // Base color of the sphere
    gradient.addColorStop(0.9, "rgba(24, 118, 116, 1)"); // Darker edge for the sphere

    context.fillStyle = gradient;
    context.fill();
    context.closePath();
  }
}
