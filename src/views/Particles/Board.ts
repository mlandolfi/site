import { Floater } from "./Floater";
import { RepelledFloater } from "./RepelledFloater";
import { Particle, Position } from "./types";

export class Board {
  particleDensity: number;
  maxR: number;
  zScale: number;
  particles: Particle[] = [];
  particleConstructor: typeof Floater | typeof RepelledFloater;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  padding: number;
  mousePos: Position = { x: 0, y: 0, z: 0 };
  lineDist: number;

  constructor({
    particleConstructor,
    context,
    width,
    height,
    particleDensity = 0.0001,
    maxR = 10,
    padding = 20,
    zScale = 10,
    lineDist = 150,
  }: {
    particleConstructor: typeof Floater | typeof RepelledFloater;
    particleDensity?: number;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    maxR?: number;
    padding?: number;
    zScale?: number;
    lineDist?: number;
  }) {
    this.particleDensity = particleDensity;
    this.maxR = maxR;
    this.zScale = zScale;
    this.context = context;
    this.width = width;
    this.height = height;
    this.particleConstructor = particleConstructor;
    this.padding = padding;
    this.lineDist = lineDist;
  }

  generateParticles() {
    const particleCount = Math.floor(
      this.width * this.height * this.particleDensity
    );

    for (let i = 0; i < particleCount; i++) {
      this.particles.push(
        new this.particleConstructor({
          boardWidth: this.width,
          boardHeight: this.height,
          maxR: this.maxR,
          minR: 0,
          velocityMultiplier: 0.1,
          boardPadding: this.padding,
        })
      );
    }
  }

  prepareBoardForRedraw() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  moveParticles() {
    this.particles.forEach((particle) => {
      particle.moveAndGet();
    });
  }

  drawParticles() {
    this.particles.forEach((particle) => {
      particle.draw(this.context);
    });
  }

  onMouseMove(x: number, y: number) {
    this.mousePos = { x, y, z: 0 };
    this.particles.forEach((p) => {
      if (p instanceof RepelledFloater) {
        p.reactToMouse(this.mousePos);
      }
    });
  }

  drawConnectingLines() {
    const lines: Array<number[]> = [];

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length - 1; j++) {
        const outer = this.particles[i];
        const inner = this.particles[j];

        if (!this.context) {
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
          pointDist < this.lineDist &&
          !(outer.pos.x === inner.pos.x && outer.pos.y === inner.pos.y)
        ) {
          lines.push([outer.id, inner.id]);
          this.context.strokeStyle = `rgba(34, 162, 159, ${
            1 - pointDist / this.lineDist
          })`;
          this.context.beginPath();
          this.context.moveTo(outer.pos.x, outer.pos.y);
          this.context.lineTo(inner.pos.x, inner.pos.y);
          this.context.stroke();
          this.context.closePath();
        }
      }
    }
  }
}
